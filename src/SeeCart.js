import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';

const SeeCart = ({ userid }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get('/api/cart');
      const data = response.data.map(item => ({
        _id: item.foodid._id,
        name: item.foodid.name,
        description: item.foodid.description,
        price: item.foodid.price,
        count: item.count,
        quantity: item.foodid.quantity
      }));
      setCartItems(data);
    };
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`/api/cart/${itemId}`);
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const handleDecreaseItemCount = async (itemId, currentCount) => {
    const currentItem = cartItems.find((item) => item._id === itemId);
    if (currentCount === 1) {
      await handleDeleteItem(itemId);
    } else {
      await axios.put(`/api/cart/${itemId}`, { count: currentCount - 1 });
      setCartItems(
        cartItems.map((item) =>
          item._id === itemId ? { ...item, count: currentCount - 1 } : item
        )
      );
    }
  };

  const handleIncreaseItemCount = async (itemId, currentCount, currentQuantity) => {
    if (currentCount >= currentQuantity) {
      return;
    }
    await axios.put(`/api/cart/${itemId}`, { count: currentCount + 1 });
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, count: currentCount + 1 } : item
      )
    );
  };

  const handleDeleteAllItems = async () => {
    await axios.delete('/api/cart');
    setCartItems([]);
  };

  const placeOrder = () => {
    const userId = userid; //uid received as parameter
    const cart = Object.entries(cartItems).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }));
    axios.post("/api/orders", { userId, cart }).then(() => {
      // success callback
      console.log("Order placed successfully");
    }).catch((error) => {
      // error callback
      console.error("Error placing order:", error);
    });
  };  

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <div className="cart-item-count">
                  <button onClick={() => handleDecreaseItemCount(item._id, item.count)}>-</button>
                  <span>{item.count}</span>
                 
                  <button onClick={() => handleIncreaseItemCount(item._id, item.count, item.quantity)}>+</button>
                </div>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="cart-total">
              <button onClick={() => handleDeleteAllItems()}>Delete All Items</button>
              <p>Total: {cartItems.reduce((acc, item) => acc + item.price * item.count, 0)}</p>
              <button onClick={() => placeOrder()}>Place Order</button>
          </div>
        </div>
    );
  };

export default SeeCart;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';

const SeeCart = ({ userid }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/addtocart/${userid}`);
        console.log(response.data)
        const data = response.data.map(item => ({
          _id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity
        }));
        console.log(data)
        setCartItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, [userid]);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllItems = async () => {
    try {
      await axios.delete('/api/cart');
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = () => {
    const userId = userid;
    const cart = cartItems.map(({ _id, quantity }) => ({
      itemId: _id,
      quantity,
    }));
    axios.post("/api/orders", { userId, cart })
      .then(() => {
        console.log("Order placed successfully");
      })
      .catch((error) => {
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
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <button onClick={() => handleDeleteAllItems()}>Delete All Items</button>
        <p>Total: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
        <button onClick={() => placeOrder()}>Place Order</button>
      </div>
    </div>
  );
};

export default SeeCart;

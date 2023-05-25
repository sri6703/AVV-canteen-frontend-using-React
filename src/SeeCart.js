import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';
import Loading from "./loading.js";


const SeeCart = ({ userid }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

const fetchCartItems = async () => {
  try {
    const response = await axios.get(`/addtocart/${userid}`);
    const data = response.data.map(item => ({
      _id: item._id,
      name: item.item?.name,
      description: item.item?.description,
      price: item.item?.price,
      quantity: item.quantity,
      existingQuantity: item.item?.exist_quantity
    })).filter(item => item.name !== null);

    // Calculate the total quantity for each item
    const groupedItems = data.reduce((acc, item) => {
      const existingItem = acc.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setCartItems(groupedItems);
  } catch (error) {
    console.error(error);
  }
};

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        id: item.item?._id,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity,
      }));
      const item = data.find(item => item._id === itemId);
      const { _id,id, existingQuantity, quantity } = item;
      console.log(quantity)
      console.log(existingQuantity)
      console.log(existingQuantity+quantity)
      // Make a PATCH request to update the existing quantity
      await axios.patch(`canteen/${id}/${existingQuantity + quantity}`);
      // Delete the item from the cart
      await axios.delete(`/addtocart/${_id}`);
  
      // Update the cartItems state by filtering out the deleted item
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteAllItems = async () => {
    try {
      // Retrieve the current items in the cart
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        id: item.item?._id,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity,
      }));
  
      // Update the existing quantities of all items
      for (const item of data) {
        const { id, existingQuantity, quantity } = item;
  
        // Make a PATCH request to update the existing quantity
        await axios.patch(`canteen/${id}/${existingQuantity + quantity}`);

      }
  
      // Delete all items from the cart
      await axios.delete('/addtocart');
  
      // Update the cartItems state
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
      <div className='cart-header'>
          <h1>My Cart</h1>
          <img src={cartgif} alt="Cart" />    
      </div>

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
                <button className='delete-btn' onClick={() => handleDeleteItem(item._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <button onClick={handleDeleteAllItems}>Delete All Items</button>
        <p>Total: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default SeeCart;

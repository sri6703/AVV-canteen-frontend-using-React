import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';
import Loading from "./loading.js";
import cartgif from "./img/cart.gif";

const SeeCart = ({ userid }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

const fetchCartItems = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get(`/addtocart/${userid}`);
    const data = response.data.map(item => ({
      _id: item._id,
      name: item.item?.name,
      description: item.item?.description,
      price: item.item?.price,
      quantity: item.quantity,
      existingQuantity: item.item?.exist_quantity
    })).filter(item => item.name !== null);
    setIsLoading(false);
    // Calculate the total quantity for each item
    //sample commits
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
      setIsLoading(true);
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        id: item.item?._id,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity,
      }));
      setIsLoading(false);
      const item = data.find(item => item._id === itemId);
      const { _id,id, existingQuantity, quantity } = item;
      console.log(quantity)
      console.log(existingQuantity)
      console.log(existingQuantity+quantity)
      setIsLoading(true);
      // Make a PATCH request to update the existing quantity
      await axios.patch(`canteen/${id}/${existingQuantity + quantity}`);
      // Delete the item from the cart
      await axios.delete(`/addtocart/${_id}`);
      setIsLoading(false);
  
      // Update the cartItems state by filtering out the deleted item
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  

  const handleDeleteAllItems = async () => {
    try {
      // Retrieve the current items in the cart
      setIsLoading(true);
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        id: item.item?._id,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity,
      }));
      setIsLoading(false);
          setIsLoading(true);

      // Update the existing quantities of all items
      for (const item of data) {
        const { id, existingQuantity, quantity } = item;
        // Make a PATCH request to update the existing quantity
        await axios.patch(`canteen/${id}/${existingQuantity + quantity}`);

      }
      setIsLoading(false);
      // Delete all items from the cart
      setIsLoading(true);
      await axios.delete('/addtocart');
      setIsLoading(false);
      // Update the cartItems state
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };
  

  const placeOrder = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.post(`addtocart/place-order`, { userid });
  
      console.log("Order placed successfully");
  
      // Clear the cart items after successful order placement
      setCartItems([]);
  
      setIsLoading(false);
    } catch (error) {
      console.error("Error placing order:", error);
      setIsLoading(false);
    }
  };
  
  

  if (isLoading) {
    return <Loading />;
  }

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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';

const SeeCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    };
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`/api/cart/${itemId}`);
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const handleDecreaseItemCount = async (itemId, currentCount) => {
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
                  <button>+</button>
                </div>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeCart;
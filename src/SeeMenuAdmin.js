import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenuAdmin.css';

const SeeMenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');

  const fetchMenuItems = async () => {
    try {
      let url = 'canteen/';
      if (currentCategory !== 'All') {
        url += `${currentCategory}`;
      }
      if (currentCanteen !== 'All') {
        url +=  `/${currentCanteen}/`;
      }
      console.log(url)
      const response = await axios.get(url);
      const formattedData = response.data.map((item) => ({
        _id: item._id,
        foodid: item.foodid,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        canteenname: item.canteenname,
        quantity: 0 // Add the 'quantity' property here
      }));
      setMenuItems(formattedData);
      console.log(formattedData);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [currentCanteen, currentCategory]); 

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  const handleCategorySwitch = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handleEdit = async (itemId) => {
    const itemToEdit = menuItems.find((item) => item._id === itemId);
    const newPrice = prompt('Enter the new price:', itemToEdit.price);
    const newDescription = prompt('Enter the new description:', itemToEdit.description);

    try {
      const response = await axios.patch(`canteen/${itemId}`, {
        price: newPrice,
        description: newDescription
      });
      const updatedItem = response.data;
      const newMenuItems = menuItems.map((item) => {
        if (item._id === updatedItem._id) {
          return updatedItem;
        } else {
          return item;
        }
      });
      setMenuItems(newMenuItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`canteen/${itemId}`);
      const newMenuItems = menuItems.filter((item) => item._id !== itemId);
      setMenuItems(newMenuItems);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu-container">
      <div className="filters">
        <div className="category-switch">
          <label>
            Category:
            <select value={currentCategory} onChange={handleCategorySwitch}>
              <option value="All">All</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </select>
          </label>
        </div>
        <div className="canteen-switch">
          <label>
            Canteen:
            <select value={currentCanteen} onChange={handleCanteenSwitch}>
              <option value="All">All</option>
              <option value="business">business</option>
              <option value="it">it</option>
              <option value="main">main</option>
            </select>
          </label>
        </div>
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Canteen</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.canteenname}</td>
              <td>{item.quantity}</td>
              <td>
              <button className='edit-button' onClick={() => handleEdit(item._id)}>Edit</button>
              </td>
              <td>
              <button className='delete-button' onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SeeMenuAdmin;
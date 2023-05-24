import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenuAdmin.css';

const SeeMenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const fetchMenuItems = async () => {
    try {
      let url = 'canteen/';
      if (currentCategory !== 'All') {
        url += `${currentCategory}`;
      }
      if (currentCanteen !== 'All') {
        url += `/${currentCanteen}/`;
      }
      console.log(url);
      const response = await axios.get(url);
      const formattedData = response.data.map((item) => ({
        foodid: item.foodid,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        canteenname: item.canteenname,
        quantity: item.exist_quantity,
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

  const handleEdit = (itemId) => {
    const itemToEdit = menuItems.find((item) => item.foodid === itemId);
    setEditingItemId(itemToEdit.foodid);
    setEditedPrice(itemToEdit.price);
    setEditedDescription(itemToEdit.description);
    setIsEditing(true);
  };


  const handleSaveEdit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      const url = `canteen/${editingItemId}`;
      const response = await axios.patch(url, {
        price: editedPrice,
        description: editedDescription,
      });
      console.log('Updated Item:', response.data);
      const updatedItem = response.data;
  
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.foodid === updatedItem.foodid ? updatedItem : item
        )
      );
  
      setEditingItemId(null);
      setEditedPrice('');
      setEditedDescription('');
      setIsEditing(false);

      await fetchMenuItems();
    } catch (error) {
      console.error('Error updating item:', error);
      console.log('Updated Item:', {
        foodid: editingItemId,
        price: editedPrice,
        description: editedDescription,
      });
    }
  };
  
  




  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedPrice('');
    setEditedDescription('');
    setIsEditing(false);
  };

  const handleDelete = async (canteenname, category, foodid) => {
    try {
      const response = await axios.delete(
        `canteen/${canteenname}/${category}/${foodid}`
      );
      if (response.status === 200) {
        const newMenuItems = menuItems.filter((item) => item.foodid !== foodid);
        setMenuItems(newMenuItems);
      } else {
        console.log('Menu deletion failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  return (
    <div className="menu-container">
      {!isEditing ? (
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
      ) : null}

      {!isEditing ? (
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
              <tr key={item.foodid}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.canteenname}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item.foodid)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.canteenname, item.category, item.foodid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <form className="edit-form">
          <label>
            Price:
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </label>
          <div>
            <button className="save-button" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SeeMenuAdmin;

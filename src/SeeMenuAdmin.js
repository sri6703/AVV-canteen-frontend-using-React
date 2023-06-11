import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenuAdmin.css';
import Loading from './loading.js';
import chefImage2 from './img/chef.gif';

const SeeMenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentPriceRange, setCurrentPriceRange] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImage, setEditedImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('canteen');
      const formattedData = response.data.map((item) => ({
        foodid: item.foodid,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        canteenname: item.canteenname,
        quantity: item.exist_quantity,
        image: item.image,
      }));

      let filteredItems = formattedData;

      if (currentCategory !== 'All') {
        filteredItems = filteredItems.filter(
          (item) => item.category === currentCategory
        );
      }

      if (currentCanteen !== 'All') {
        filteredItems = filteredItems.filter(
          (item) => item.canteenname === currentCanteen
        );
      }

      if (currentPriceRange !== 'All') {
        const priceRange = parseInt(currentPriceRange);
        filteredItems = filteredItems.filter((item) => item.price <= priceRange);
      }

      setMenuItems(filteredItems);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [currentCanteen, currentCategory, currentPriceRange]);

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  const handleCategorySwitch = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handlePriceRangeSwitch = (event) => {
    setCurrentPriceRange(event.target.value);
  };

  const handleEdit = (itemId) => {
    const itemToEdit = menuItems.find((item) => item.foodid === itemId);
    setEditingItemId(itemToEdit.foodid);
    setEditedPrice(itemToEdit.price);
    setEditedDescription(itemToEdit.description);
    setEditedImage(itemToEdit.image);
    setIsEditing(true);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const url = `canteen/${editingItemId}`;
      const response = await axios.patch(url, {
        price: editedPrice,
        description: editedDescription,
        image: editedImage,
      });
      setIsLoading(false);
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
      setEditedImage('');
      setIsEditing(false);

      await fetchMenuItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedPrice('');
    setEditedDescription('');
    setEditedImage('');
    setIsEditing(false);
  };

  const handleDelete = async (canteenname, category, foodid) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `canteen/${canteenname}/${category}/${foodid}`
      );
      setIsLoading(false);
      if (response.status === 200) {
        const newMenuItems = menuItems.filter((item) => item.foodid !== foodid);
        setMenuItems(newMenuItems);
      } else {
        console.log('Menu deletion failed:', response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="menu-container">
      <div className="greet-menu2">
        <h2>Edit Menu</h2>
        <img src={chefImage2} alt="user icon" />
      </div>
      {!isEditing ? (
        <div className="filters">
          <div className="switch-filter2">
            <label>
              Category:
              <select value={currentCategory} onChange={handleCategorySwitch}>
                <option value="All">All</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </label>
          </div>
          <div className="switch-filter2">
            <label>
              Canteen:
              <select value={currentCanteen} onChange={handleCanteenSwitch}>
                <option value="All">All</option>
                <option value="business">Business</option>
                <option value="it">IT</option>
                <option value="main">Main</option>
              </select>
            </label>
          </div>
          <div className="switch-filter2">
            <label>
              Price Range:
              <select value={currentPriceRange} onChange={handlePriceRangeSwitch}>
                <option value="All">All</option>
                <option value="50">Less than 50</option>
                <option value="100">Less than 100</option>
                <option value="150">Less than 150</option>
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
              <th>Image</th>
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
                  <img src={item.image} alt="Item" style={{ width: '50px', height: '50px' }} />
                </td>
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
          <label>
            Image:
            <input
              type="text"
              value={editedImage}
              onChange={(e) => setEditedImage(e.target.value)}
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

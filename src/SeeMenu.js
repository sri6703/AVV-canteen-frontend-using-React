import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenu.css';

const SeeMenu = ({ userid }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('Canteen 1');
  const [currentCategory, setCurrentCategory] = useState('All');

  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('canteen/');
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };  

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  const handleCategorySwitch = (event) => {
    setCurrentCategory(event.target.value);
  };

  const filterMenuItems = () => {
    if (currentCategory === 'All') {
      return menuItems.filter((item) => item.canteenname === currentCanteen);
    } else {
      return menuItems.filter(
        (item) =>
          item.canteenname === currentCanteen && item.category === currentCategory
      );
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
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </label>
        </div>
        <div className="canteen-switch">
          <label>
            Canteen:
            <select value={currentCanteen} onChange={handleCanteenSwitch}>
              <option value="All">All</option>
              <option value="Canteen 1">Canteen 1</option>
              <option value="Canteen 2">Canteen 2</option>
              <option value="Canteen 3">Canteen 3</option>
            </select>
          </label>
        </div>
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filterMenuItems().map((item) => (
            <tr key={item.foodid}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <div className="add-to-cart">
<<<<<<< HEAD
                  <button>-</button>
                  <span>0</span>
                  <button>+</button>
                  </div>
=======
                <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                </div>
>>>>>>> de7bb5760738e35b4cd85c3fcb1d9be993bc0fd1
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeMenu;


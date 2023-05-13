import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenu.css';

const SeeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('Canteen 1');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('canteen/');
        setMenuItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  return (
    <div className="menu-container">
      <div className="canteen-switch">
        <label>
          <select value={currentCanteen} onChange={handleCanteenSwitch}>
            <option value="Canteen 1">Canteen 1</option>
            <option value="Canteen 2">Canteen 2</option>
            <option value="Canteen 3">Canteen 3</option>
          </select>
        </label>
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
          {menuItems.map((item) => (
            item.canteenname === currentCanteen && (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <div className="add-to-cart">
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeMenu;

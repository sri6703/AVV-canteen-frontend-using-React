import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenu.css';

const SeeMenu = ({ userid }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');

  const [cartItems, setCartItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      let url = 'canteen/';
      if (currentCategory !== 'All') {
        url += `${currentCategory}`;
      }
      if (currentCanteen !== 'All') {
        url +=  `/${currentCanteen}/`;
      }
      const response = await axios.get(url);                
      const formattedData = response.data.map((item) => ({
        _id: item._id,
        foodid: item.foodid,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        canteenname: item.canteenname,
        exist_quantity: item.exist_quantity,
        quantity: 0
      }));
      setMenuItems(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [currentCanteen, currentCategory]);

  const handleAddToCart = async (itemId) => {
    const updatedMenuItems = menuItems.map((item) => {
      if (item._id === itemId && item.exist_quantity > 0) {
        return {
          ...item,
          exist_quantity: item.exist_quantity - 1,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setMenuItems(updatedMenuItems);
  
    const selectedItem = menuItems.find((item) => item._id === itemId);
    setCartItems((prevCartItems) => [...prevCartItems, selectedItem]);
  
    try {
      const ex = selectedItem.exist_quantity - 1;
      if (currentCategory === 'All' && currentCanteen === 'All') {
        // Make API call to update the existing quantity
        await axios.patch(`canteen/${itemId}/${ex}`);
      } else {
        await axios.patch(
          `canteen/${currentCanteen}/${currentCategory}/${itemId}/${ex}`
        );
      }
      console.log(userid,selectedItem._id,selectedItem.quantity)
      // Make API call to store the selected item in the database
      await axios.post('addtocart/', {
        userid: userid,
        itemId: selectedItem._id,
        quantity: selectedItem.quantity,
      });
  
      // Handle the API call responses as needed
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the API calls
    }
  };
  

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  const handleCategorySwitch = (event) => {
    setCurrentCategory(event.target.value);
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
          <th>Food-Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Canteen</th>
            <th>Exist Quantity</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
        {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.foodid}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.canteenname}</td>
              <td>{item.exist_quantity}</td>
              <td>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  disabled={item.exist_quantity === 0} // Disable button when exist_quantity is 0
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeMenu;

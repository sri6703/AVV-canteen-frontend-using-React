import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeMenu.css';

const SeeMenu = ({ userid }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentRating, setCurrentRating] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      let url = 'canteen/';
      if (currentCategory !== 'All') {
        url += `${currentCategory}`;
      }
      if (currentCanteen !== 'All') {
        url += `/${currentCanteen}/`;
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
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-aDfNoRp2H9pztkTOo_h5rwxCe6guDO4i9_iBi1Pmw&s',
        quantity: 0,
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
        await axios.patch(`canteen/${currentCanteen}/${currentCategory}/${itemId}/${ex}`);
      }

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

  const handleRating = (rating) => {
    setCurrentRating(rating);
  };

  return (
    <div className="menu-container">
      <div className="filters">
        <div className="category-switch">
          <label>
          {"\n"}{"\n"}
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

      {menuItems.map((item) => (
        <div className="menu-cards" key={item._id}>
          <div className="menu-card">
            <div className="menu-card-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="menu-card-content">
              <div className="menu-card-info">
                <div className="menu-card-column">
                  <h3>{item.name}</h3>
                  <p className="price">Price: {item.price}</p>
                  <p className="category">Category: {item.category}</p>
                </div>
                <div className="menu-card-column">
                <div className="menu-card-column1">
                  <p className="canteen">Canteen: {item.canteenname}</p>
                  <p className="description">Description: {item.description}</p>
                  <p className="quantity">Exist Quantity: {item.exist_quantity}</p>
                </div></div>
                <div className="menu-card-column">
                  <div className="menu-card-ratings">
                    <label>Ratings:</label>
                    <span className="rating-star" onClick={() => handleRating(1)}>
                      {currentRating >= 1 ? '★' : '☆'}
                    </span>
                    <span className="rating-star" onClick={() => handleRating(2)}>
                      {currentRating >= 2 ? '★' : '☆'}
                    </span>
                    <span className="rating-star" onClick={() => handleRating(3)}>
                      {currentRating >= 3 ? '★' : '☆'}
                    </span>
                    <span className="rating-star" onClick={() => handleRating(4)}>
                      {currentRating >= 4 ? '★' : '☆'}
                    </span>
                    <span className="rating-star" onClick={() => handleRating(5)}>
                      {currentRating >= 5 ? '★' : '☆'}
                    </span>
                  </div>
                  <div className="menu-card-actions">
                    <button onClick={() => handleAddToCart(item._id)} disabled={item.exist_quantity === 0}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeeMenu;

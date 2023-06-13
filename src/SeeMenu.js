import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './SeeMenu.css';
import Loading from "./loading.js";
import chefImage from './img/chef.gif';

const SeeMenu = ({ userid }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentPrice, setCurrentPrice] = useState('All');
  const [currentRating, setCurrentRating] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('canteen/');
      const formattedData = response.data.map((item) => ({
        _id: item._id,
        foodid: item.foodid,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        canteenname: item.canteenname,
        exist_quantity: item.exist_quantity,
        imageUrl: item.image,
      }));

      // Apply filters based on currentCategory, currentCanteen, and currentPrice
      let filteredItems = formattedData;

      if (currentCategory !== 'All') {
        filteredItems = filteredItems.filter((item) => item.category === currentCategory);
      }

      if (currentCanteen !== 'All') {
        filteredItems = filteredItems.filter((item) => item.canteenname === currentCanteen);
      }

      if (currentPrice !== 'All') {
        const priceLimit = parseInt(currentPrice, 10);
        filteredItems = filteredItems.filter((item) => item.price <= priceLimit);
      }

      setMenuItems(filteredItems);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [currentCategory, currentCanteen, currentPrice]);

    useEffect(() => {
      fetchMenuItems();
    }, [fetchMenuItems]);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`addtocart/${userid}`);
        const fetchedCartItems = response.data;
        setCartItems(fetchedCartItems);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userid]);

  const handleAddToCart = useCallback(
    async (itemId) => {
      const updatedMenuItems = menuItems.map((item) => {
        if (item._id === itemId && item.exist_quantity > 0) {
          return {
            ...item,
            exist_quantity: item.exist_quantity - 1,
          };
        }
        return item;
      });

      setMenuItems(updatedMenuItems);

      const selectedItem = updatedMenuItems.find((item) => item._id === itemId);
      setCartItems((prevCartItems) => [...prevCartItems, selectedItem]);

      try {
        const date = new Date();
        let qn = 0;
        setIsLoading(true);
        const response = await axios.get(`addtocart/${userid}/${itemId}`);
          if (response.data.quantity === null) {
            qn = 0;
          } else {
            const existingQuantity = response.data.quantity;
            qn = existingQuantity + 1;
          }
        const ex = selectedItem.exist_quantity ;
        if (currentCategory === 'All' && currentCanteen === 'All') {
          await axios.patch(`canteen/${itemId}/${ex}`);
        } else {
          await axios.patch(`canteen/${currentCanteen}/${currentCategory}/${itemId}/${ex}`);
        }

        const existingCartItem = cartItems.find((item) => item.itemId === itemId);
        if (existingCartItem) {
          // If the item already exists in the cart, update the quantity using PATCH
          await axios.patch(`addtocart/${existingCartItem._id}`, {
            existing_quantity: qn,
            date: date,
          });
        } else {
          // If the item doesn't exist in the cart, create a new cart item using POST
          await axios.post('addtocart/', {
            userid: userid,
            itemId: selectedItem._id,
            quantity: qn,
            date: date,
          });
        }
        setIsLoading(false);
        // Handle the API call responses as needed
      } catch (error) {
        console.error(error);
        // Handle any errors that occur during the API calls
        setIsLoading(false);
      }
    },
    [currentCategory, currentCanteen, menuItems, cartItems, userid]
  );

  const handleCanteenSwitch = (event) => {
    setCurrentCanteen(event.target.value);
  };

  const handleCategorySwitch = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handlePriceSwitch = (event) => {
    setCurrentPrice(event.target.value);
  };
  
  const handleRating = (rating) => {
    setCurrentRating(rating);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="menu-container1">
      <div className='greet-menu'>
        <h2>Todays Special</h2>
        <img src={chefImage} className="icon" alt="user icon" />
      </div>
      <div className="filters1">
        <div className="switch-filter">
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
        <div className="switch-filter">
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
        <div className="switch-filter">
          <label>
            Price:
            <select value={currentPrice} onChange={handlePriceSwitch}>
              <option value="All">All</option>
              <option value="50">Less than Rs50</option>
              <option value="100">Less than Rs100</option>
              <option value="150">Less than Rs150</option>
            </select>
          </label>
        </div>
      </div>

      {menuItems.map((item) => (
        <div className="menu-cards" key={item._id}>
          <div className="menu-card">
            <div className="menu-card-image">
              <img src={item.imageUrl} alt={item.name} style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="menu-card-content">
                <h3>{item.name}</h3>
                Rs.{item.price}.00/-<br />
                {item.category}             
             </div> 
              <div className="menu-card-info">
                <p>Canteen: {item.canteenname}</p>
                <p>Description: {item.description}</p>
                <p>In stock: {item.exist_quantity}</p>
              </div>
              <div className="menu-card-actions">
                <div className="menu-card-rating">
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
                <hr />
                <button onClick={() => handleAddToCart(item._id)} disabled={item.exist_quantity === 0}>
                  Add to Cart
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeeMenu;
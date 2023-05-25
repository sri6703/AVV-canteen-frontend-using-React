import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './SeeMenu.css';
import Loading from "./loading.js";
import chefImage from './img/chef.gif';

const SeeMenu = ({ userid }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentCanteen, setCurrentCanteen] = useState('All');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentRating, setCurrentRating] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMenuItems = useCallback(async () => {
    try {
      let url = 'canteen/';
      if (currentCategory !== 'All') {
        url += `${currentCategory}`;
      }
      if (currentCanteen !== 'All') {
        url += `/${currentCanteen}/`;
      }
      setIsLoading(true);
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
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-aDfNoRp2H9pztkTOo_h5rwxCe6guDO4i9_iBi1Pmw&s',
      }));
      setMenuItems(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [currentCanteen, currentCategory]);

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
        let qn = 0;
        setIsLoading(true);
        const response = await axios.get(`addtocart/${userid}/${itemId}`);
        setIsLoading(false);
if (response.data.quantity === null) {
  qn = 0;
} else {
  const existingQuantity = response.data.quantity;
  qn = existingQuantity + 1;
}

        const ex = selectedItem.exist_quantity ;
        setIsLoading(true);
        if (currentCategory === 'All' && currentCanteen === 'All') {
          await axios.patch(`canteen/${itemId}/${ex}`);
        } else {
          await axios.patch(`canteen/${currentCanteen}/${currentCategory}/${itemId}/${ex}`);
        }
        setIsLoading(false);

        const existingCartItem = cartItems.find((item) => item.itemId === itemId);
        setIsLoading(true);
        if (existingCartItem) {
          // If the item already exists in the cart, update the quantity using PATCH
          await axios.patch(`addtocart/${existingCartItem._id}`, {
            existing_quantity: qn,
          });
        } else {
          // If the item doesn't exist in the cart, create a new cart item using POST
          await axios.post('addtocart/', {
            userid: userid,
            itemId: selectedItem._id,
            quantity: qn,
          });
        }
        setIsLoading(false);
        // Handle the API call responses as needed
      } catch (error) {
        console.error(error);
        // Handle any errors that occur during the API calls
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

      {menuItems.map((item) => (
        <div className="menu-cards" key={item._id}>
          <div className="menu-card">
            <div className="menu-card-image">
              <img src={item.imageUrl} alt={item.name} />
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddItem.css';
import Loading from "./loading.js";
import chair from './img/canteen.gif';


const AddItem = () => {
  const [itemid, setFoodId] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [canteen, setCanteen] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itemstatus, setItemStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItemStatus('');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      foodid: itemid,
      name: itemName,
      price: price,
      description: description,
      category: category,
      canteenname: canteen,
      exist_quantity: quantity
    };

    try {
      setIsLoading(true);
      const response = await axios.post('/canteen', newItem);
      setItemStatus(response.data.message);
      setErrorMessage('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error adding item:', error);
      setErrorMessage('Error adding item. Please try again.');
      setItemStatus('');
      setIsLoading(false);
    }

    // Reset the form inputs
    setFoodId('');
    setItemName('');
    setDescription('');
    setPrice(0);
    setCanteen('');
    setCategory('');
    setQuantity(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="add-item-container" style={{ height: '100vh' }}>
      <div className='additem-greet'>
      <h1>Add Item to Canteen</h1>
      <img src={chair} alt="chair" />
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '10px 10px 10px 10px' }}>
            <label htmlFor="canteen">Canteen:</label>
            <select
              id="canteen"
              value={canteen}
              onChange={(event) => setCanteen(event.target.value)}
            >
              <option value="">Select Canteen</option>
              <option value="main">main</option>
              <option value="it">IT</option>
              <option value="business">business</option>
            </select>
          </div>
          <div style={{ margin: '10px 10px 10px 10px' }}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select Category</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="foodid">Food ID:</label>
          <input
            type="text"
            id="foodid"
            value={itemid}
            onChange={(event) => setFoodId(Number(event.target.value))}
          />
        </div>
        <div>
          <label htmlFor="item-name">Item Name:</label>
          <input
            type="text"
            id="item-name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price in INR:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity (Stock):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </div>
        <br />
        <div>
          <button type="submit">Add Item</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {itemstatus && <p>{itemstatus}</p>}
      </form>
    </div>
  );
};

export default AddItem;

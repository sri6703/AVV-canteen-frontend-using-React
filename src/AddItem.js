import React, { useState } from 'react';
import "./AddItem.css";

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [canteen, setCanteen] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g. send data to server
  };

  return (
    <div className="add-item-container" style={{height: '100vh'}}>
      <h1>Add Item to Canteen</h1>
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
      <div style={{ margin: '10px 10px 10px 10px'}}>
          <label htmlFor="canteen">Canteen:</label>
          <select
            id="canteen"
            value={canteen}
            onChange={(event) => setCanteen(event.target.value)}
          >
            <option value="main">main</option>
            <option value="it">IT</option>
            <option value="business">business</option>
          </select>
        </div>
        <div style={{ margin: '10px 10px 10px 10px'}}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="breakfast">breakfast</option>
            <option value="lunch">lunch</option>
            <option value="dinner">dinner</option>
          </select>
        </div>
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
        
      </form>
    </div>
  );
};

export default AddItem;
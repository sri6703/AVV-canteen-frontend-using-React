import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./OrderHistory.css";
import ordergif from "./img/orderhistory.gif";

const OrderHistory = ({ userid }) => {
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch order history from the API using Axios
    axios
      .get(`addtocart/${userid}`)
      .then((response) => {
        // Update the orders state with the fetched data
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [userid]);

  const handleViewItem = (itemId) => {
    // Find the selected item from the orders state
    const selectedItem = orders.find((order) => order.itemId === itemId);
    setSelectedItem(selectedItem);
  };

  const handleCancelView = () => {
    setSelectedItem(null);
  };

  return (
    <div className="order-history">
        <div className='orderhistory-header'>
          <h1>Order History</h1>
          <img src={ordergif} alt="Cart" />    
      </div>
      {selectedItem ? (
  <div className="item-details">
    <h2>Item Details</h2>
    <p>Item ID: {selectedItem.item.foodid}</p>
    <p>Item Name: {selectedItem.item.name}</p>
    <p>Canteen: {selectedItem.item.canteenname}</p>
    <p>Date: {selectedItem.date}</p>
    <p>Price: {selectedItem.item.price}</p>
    <p>Quantity: {selectedItem.quantity}</p>
    <button onClick={handleCancelView}>Cancel</button>
  </div>
) : (
  <table>
    <thead>
      <tr>
        <th>Item ID</th>
        <th>Item Name</th>
        <th>Canteen</th>
        <th>Date</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr >
          <td>{order.item.foodid}</td>
          <td>{order.item.name}</td>
          <td>{order.item.canteenname}</td>
          <td>{order.date}</td>
          <td>{order.item.price}</td>
          <td>{order.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
  );
};

export default OrderHistory;

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
      .get(`your-order-history-api-endpoint?userid=${userid}`)
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
          <p>Item ID: {selectedItem.itemId}</p>
          <p>Item Name: {selectedItem.itemName}</p>
          <p>Canteen: {selectedItem.canteen}</p>
          <p>Date: {selectedItem.date}</p>
          <p>Price: {selectedItem.price}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <button onClick={handleCancelView}>Cancel</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Canteen</th>
              <th>Date</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.itemId}</td>
                <td>{order.itemName}</td>
                <td>{order.canteen}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>
                  <button
                    className="view-item-button"
                    onClick={() => handleViewItem(order.itemId)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;

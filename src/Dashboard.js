import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from "react-chartjs-2";

const Dashboard = () => {
  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
    Chart.register({
      id: 'category',
      isScale: true,
      type: 'category',
      parse: () => {},
      release: () => {}
    });
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch the cart items
    // Replace this with your actual API call to get the items stored in the cart
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/canteen/ordered`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const chartData = {
    labels: cartItems.map(item => item.name),
    datasets: [
      {
        label: "Link Graph",
        data: cartItems.map(item => item.count),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ width: "400px", height: "300px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
      {/* ... other dashboard components ... */}
    </div>
  );
};

export default Dashboard;
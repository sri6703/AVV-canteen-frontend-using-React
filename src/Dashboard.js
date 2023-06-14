<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react";
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

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Simulating an API call to fetch the cart count
    // Replace this with your actual API call to get the count of items in the cart
    const fetchCartCount = async () => {
      try {
        const response = await fetch("/ordered");
        const data = await response.json();
        setCartCount(data.count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  const chartData = {
    labels: ["Cart"],
    datasets: [
      {
        label: "Link Graph",
        data: [cartCount],
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
        type: "category",
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
>>>>>>> a89cfebe0aa2bf0daaffaaee84f15ec4ff512af0

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const MostOrderedItemsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchMostOrderedItems();
  }, []);

  const fetchMostOrderedItems = async () => {
    try {
      const response = await axios.get(`canteen/cart/most-ordered`); // Replace with your API endpoint
      const data = response.data;

      if (Array.isArray(data)) { // Check if data is an array
        const itemNames = data.map(item => item.item.name);
        const itemCounts = data.map(item => item.count);

        setChartData({
          labels: itemNames,
          datasets: [
            {
              label: 'Most Ordered Items',
              data: itemCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }
          ]
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Most Ordered Items</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0
            }
          }
        }}
      />
    </div>
  );
};

export default MostOrderedItemsChart;

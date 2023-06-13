import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

import "./SeeTableBookings.css";

function SeeTableBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch table bookings from the backend
    fetchTableBookings();
  }, []);

  const fetchTableBookings = async () => {
    try {
      // Make an API call to get the table bookings
      const response = await axios.get("/api/bookings");

      // Set the bookings state with the data from the response
      setBookings(response.data);
    } catch (error) {
      console.log("Error fetching table bookings:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      // Make an API call to delete the booking
      await axios.delete(`/api/bookings/${bookingId}`);

      // Remove the deleted booking from the bookings state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };

  return (
    <div className="table-bookings-container">
      <h1>Table Bookings</h1>
      <table className="table-bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>User ID</th>
            <th>Table No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>{booking.userId}</td>
              <td>{booking.tableNo}</td>
              <td>
                <button
                  className="delete-button2"
                  onClick={() => deleteBooking(booking.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeeTableBookings;

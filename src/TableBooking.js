import React, { useState } from 'react';
import './TableBooking.css';

const TableBooking = ({ userid }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedTables, setSelectedTables] = useState([]);

  const handleTableClick = (table) => {
    const isTableSelected = selectedTables.some((selectedTable) => selectedTable.id === table.id);

    if (isTableSelected) {
      setSelectedTables(selectedTables.filter((selectedTable) => selectedTable.id !== table.id));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const isTableBooked = (tableId) => {
    // Replace with your backend API call to check if the table is booked
    const bookedTables = []; // Replace with your booked tables data from the backend

    return bookedTables.some((bookedTable) => bookedTable.id === tableId);
  };

  const isTableSelected = (tableId) => {
    return selectedTables.some((selectedTable) => selectedTable.id === tableId);
  };

  const handleBookingConfirmation = () => {
    // Perform the booking operation here
    console.log('Booking confirmed!');
    setSelectedTables([]);
  };

  return (
    <div className="table-booking">
      <h2>Table Booking</h2>
      <div className="booking-content">
      <div className="booking-form">
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
      </div>
      <div className="seating-plan">
        <h3>Canteen 1</h3>
        <div className="row">
          <div
            className={`table-cell ${isTableBooked('c1_1') ? 'unavailable' : isTableSelected('c1_1') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c1_1' })}
          >
            Table 1
          </div>
          <div
            className={`table-cell ${isTableBooked('c1_2') ? 'unavailable' : isTableSelected('c1_2') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c1_2' })}
          >
            Table 2
          </div>
          <div
            className={`table-cell ${isTableBooked('c1_3') ? 'unavailable' : isTableSelected('c1_3') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c1_3' })}
          >
            Table 3
          </div>
          <div
            className={`table-cell ${isTableBooked('c1_4') ? 'unavailable' : isTableSelected('c1_4') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c1_4' })}
          >
            Table 4
          </div>
        </div>
      </div>
      <div className="seating-plan">
        <h3>Canteen 2</h3>
        <div className="row">
          <div
            className={`table-cell ${isTableBooked('c2_1') ? 'unavailable' : isTableSelected('c2_1') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c2_1' })}
          >
            Table 1
          </div>
          <div
            className={`table-cell ${isTableBooked('c2_2') ? 'unavailable' : isTableSelected('c2_2') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c2_2' })}
          >
            Table 2
          </div>
          <div
            className={`table-cell ${isTableBooked('c2_3') ? 'unavailable' : isTableSelected('c2_3') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c2_3' })}
          >
            Table 3
          </div>
          <div
            className={`table-cell ${isTableBooked('c2_4') ? 'unavailable' : isTableSelected('c2_4') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c2_4' })}
          >
            Table 4
          </div>
        </div>
      </div>
      <div className="seating-plan">
        <h3>Canteen 3</h3>
        <div className="row">
          <div
            className={`table-cell ${isTableBooked('c3_1') ? 'unavailable' : isTableSelected('c3_1') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c3_1' })}
          >
            Table 1
          </div>
          <div
            className={`table-cell ${isTableBooked('c3_2') ? 'unavailable' : isTableSelected('c3_2') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c3_2' })}
          >
            Table 2
          </div>
          <div
            className={`table-cell ${isTableBooked('c3_3') ? 'unavailable' : isTableSelected('c3_3') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c3_3' })}
          >
            Table 3
          </div>
          <div
            className={`table-cell ${isTableBooked('c3_4') ? 'unavailable' : isTableSelected('c3_4') ? 'selected' : ''}`}
            onClick={() => handleTableClick({ id: 'c3_4' })}
          >
            Table 4
          </div>
        </div>
      </div>
      <div className="booking-info">
        <h3>Booking Information</h3>
        <p>
          Selected Tables:{' '}
          {selectedTables.length === 0 ? <span className="empty">No tables selected</span> : selectedTables.map((table) => table.id).join(', ')}
        </p>
        <button
          className="confirm-booking-btn"
          disabled={!date || !startTime || !endTime || selectedTables.length === 0}
          onClick={handleBookingConfirmation}
        >
          Confirm Booking
        </button>
      </div>
    </div>
    </div>
  );
};

export default TableBooking;

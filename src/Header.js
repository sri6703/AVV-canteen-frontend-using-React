import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header({ isLoggedIn }) { 
  const backgroundColor = isLoggedIn ? '#A4123F' : 'white';
  const color = isLoggedIn ? 'white' : '#A4123F';
  
  return (
    <header style={{ backgroundColor, color }}>
      <nav>
        <div className="logo">
          <h2>Amrita University Canteen Management</h2>
        </div>
      </nav>
    </header>
  );
}

export default Header;

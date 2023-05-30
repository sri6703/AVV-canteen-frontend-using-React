import React from 'react';
import "./Header.css";

function Header({ isLoggedIn }) { 
  const backgroundColor = isLoggedIn ? 'white' : 'white';
  const color = isLoggedIn ? '#A4123F' : '#A4123F';
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

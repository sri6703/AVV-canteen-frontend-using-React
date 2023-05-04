import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <div className="logo" >
          <h2>Amrita University Canteen Management</h2>
        </div>
      </nav>
    </header>
  );
}

export default Header;

/*
            <li><Link to="/">See Menu</Link></li>
            <li><Link to="/">Add Item</Link></li>
            <li><Link to="/">CanteenStats</Link></li>
            <li><Link to="/">Edit Profile</Link></li>
            <li><Link to="/">Log Out</Link></li>
*/
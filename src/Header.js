import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo" >
          <h2>Amrita University Canteen Management</h2>
        </div>
        <div className="nav-links">
          <ul>
            <li><a href="/">See Menu</a></li>
            <li><a href="/">Add Item</a></li>
            <li><a href="/">CanteenStats</a></li>
            <li><a href="/">Edit Profile</a></li>
            <li><a href="/">Log Out</a></li>
          </ul>
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
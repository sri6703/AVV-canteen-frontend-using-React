import React from 'react';
import "./Footer.css";

function Footer({ isLoggedIn }) { 
    const backgroundColor = isLoggedIn ? '#A4123F' : 'white';
    const color = isLoggedIn ? 'white' : '#A4123F';
  return (
    <footer style={{ backgroundColor, color }}>
      <p>&copy; 2023 Amrita University Canteen Management. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;

import React from 'react';
import "./Footer.css";

function Footer({ isLoggedIn }) { 
    const backgroundColor = isLoggedIn ? 'white' : 'white';
    const color = isLoggedIn ? '#A4123F' : '#A4123F';
  return (
    <footer style={{ backgroundColor, color }}>
      <p>&copy; 2023 Amrita University Canteen Management. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;

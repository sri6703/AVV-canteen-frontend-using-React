import React from 'react';
import chefImage from './img/chefclipart.jpg';
import "./LoginNext.css";

const LoginHomepage = ({ username }) => {
  return (
    <div className="login-homepage-container">
      <div className="greeting-container">
        <img src={chefImage} className="icon" alt="user icon" />
        <h1>Hi {username},</h1>
        <h2>Welcome to Amrita Canteen!</h2>
      </div>
    </div>
  );
};

export default LoginHomepage;

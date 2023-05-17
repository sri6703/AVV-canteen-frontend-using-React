import React, { useEffect, useState } from 'react';
import chefImage from './img/chefclipart.jpg';
import './LoginNext.css';
import axios from 'axios';

const LoginHomepage = ({ username }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/login-page/${username}`);
        setUser(response.data.name);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="login-homepage-container">
      <div className="greeting-container">
        <img src={chefImage} className="icon" alt="user icon" />
        <h1>Hi {user},</h1>
        <h2>Welcome to Amrita Canteen!</h2>
      </div>
    </div>
  );
};

export default LoginHomepage;

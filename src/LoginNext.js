import React, { useEffect, useState } from 'react';
import namaste from './img/namaste.gif';
import './LoginNext.css';
import axios from 'axios';

const LoginHomepage = ({ username, userType }) => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let endpoint = userType === "admin" ? `/admin-login-page/${username}` : `/login-page/${username}`;
        const response = await axios.get(endpoint);
        setUser(response.data.name);
        setType(userType);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="login-homepage-container">
      <div className="greeting-container">
        <img src={namaste} className="icon" alt="user icon" />
        <h1>Namaste {user},</h1>
        <h2>Welcome to Amrita Canteen!</h2>
      </div>
    </div>
  );
};

export default LoginHomepage;

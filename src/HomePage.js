import React from "react";
import "./HomePage.css";

function HomePage({ toggleLoginPage }) {
  return (
    <div className="home-container">
      <h2>Welcome to Amrita Vishwa Vidyapeetham Canteen System</h2>
      <p>Children, we cannot control our mind without controlling our desire for taste. <br />
        The health aspect, not the taste, should be the prime criteria in choosing the food.  <br />
        We cannot relish the blossoming of the heart without foregoing the taste of the tongue. <br />
              - Mata Amritanandamyi
        </p>
      <button onClick={toggleLoginPage}>Login to continue</button>
    </div>
  );
}

export default HomePage;
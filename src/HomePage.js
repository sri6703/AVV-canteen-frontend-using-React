import React from "react";
import "./HomePage.css";

function HomePage({ toggleLoginPage }) {
  return (
    <>
    <div>
      
    </div>

    <div className="home-container">
      <h2>Welcome to Amrita Vishwa Vidyapeetham Canteen System</h2>
      <div className="container-inner">
        <div className="quote">
        Children, we cannot control our mind without controlling our desire for taste.
        The health aspect, not the taste, should be the prime criteria in choosing the food.
        We cannot relish the blossoming of the heart without foregoing the taste of the tongue.
        <br />
        <label className="author">
          - Mata Amritanandamayi
        </label>
        </div>

      <img src="https://i0.wp.com/amritavidyalayam.org/wp-content/uploads/amma.png" />
      </div>
      <button onClick={toggleLoginPage}>Login to continue</button>
    </div></>
  );
}

export default HomePage;
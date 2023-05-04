import logo from './logo.svg';
import Header from './Header';
import Footer from './Footer';
import Loginform from './LoginForm';
import HomePage from "./HomePage";

import React, { useState } from "react";
import './App.css';

function App() {
  const [showLoginPage, setShowLoginPage] = useState(false);

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage);
  };

  return (
    <div>
      <Header />
      <main>
        {showLoginPage ? (
          <Loginform />
        ) : (
          <HomePage toggleLoginPage={toggleLoginPage} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
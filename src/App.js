import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loginform from "./LoginForm";
import Navigation from "./Navigation";
import SeeMenu from "./SeeMenu";
import HomePage from "./HomePage";
import AddItem from "./AddItem";

import "./App.css";

function App() {
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [activeComponent, setActiveComponent] = useState("seeMenu");

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage);
    setIsLoggedIn(false);
    setUserType("");
  };
  

  const handleLoginSuccess = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    setShowLoginPage(false);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        {!isLoggedIn ? (
          showLoginPage ? (
            <Loginform handleLoginSuccess={handleLoginSuccess} />
          ) : (
            <HomePage toggleLoginPage={toggleLoginPage} />
          )
        ) : (
          <div className="content-container">
            <div className="navigation-container">
            <Navigation
              userType={userType}
              handleLogout={() => setIsLoggedIn(false)}
              setActiveComponent={setActiveComponent}
            />
            </div>
            <div className="see-menu-container">
            {activeComponent === "seeMenu" ? (
              <SeeMenu />
            ) : activeComponent === "addItem" ? (
              <AddItem />
            ) : null}
          </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

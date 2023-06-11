import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import Navigation from "./Navigation";
import SeeMenu from "./SeeMenu";
import SeeMenuAdmin from "./SeeMenuAdmin";
import HomePage from "./HomePage";
import AddItem from "./AddItem";
import SeeCart from "./SeeCart";
import AccountSettings from "./AccountSettings";
import LoginHomepage from "./LoginNext";
import SendFeedback from "./SendFeedback";
import ReadFeedbacks from "./ReadFeedback";
import OrderHistory from "./OrderHistory";

import "./App.css";

function App() {
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [userid, setUserId] = useState("nil");
  const [showNavigation, setShowNavigation] = useState(true);

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage);
    setIsLoggedIn(false);
    setUserType("");
  };

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  const handleLoginSuccess = (type, id) => {
    setUserType(type);
    setIsLoggedIn(true);
    setShowLoginPage(false);
    setUserId(id);
  };

  const navigationContainerStyle = {
    width: showNavigation ? "18%" : "0",
  };

  const seeMenuContainerStyle = {
    marginLeft: showNavigation ? "18%" : "0",
  };

  const ToggleNavigationButtonStyle = {
    marginLeft: showNavigation ? "18%" : "0",
  }

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} />
      <main>
        {!isLoggedIn ? (
          showLoginPage ? (
            <LoginForm handleLoginSuccess={handleLoginSuccess} />
          ) : (
            <HomePage toggleLoginPage={toggleLoginPage} />
          )
        ) : (
          <div className="content-container"> 

            <div className="navigation-container" style={navigationContainerStyle}>
            <div className="toggle-navigation-button" style={ToggleNavigationButtonStyle} onClick={toggleNavigation}>
                  <button>&#9776;</button>
            </div>
              {showNavigation && (
                <Navigation
                  userType={userType}
                  handleLogout={() => setIsLoggedIn(false)}
                  setActiveComponent={setActiveComponent}
                />
              )}
            </div>
            <div className="see-menu-container" style={seeMenuContainerStyle}>
              {activeComponent === "Home" ? (
                <LoginHomepage username={userid} userType={userType} />
              ) : activeComponent === "SeeMenu" ? (
                <SeeMenu userid={userid} />
              ) : activeComponent === "addItem" ? (
                <AddItem />
              ) : activeComponent === "SeeCart" ? (
                <SeeCart userid={userid} />
              ) : activeComponent === "SendFeedback" ? (
                <SendFeedback userid={userid} />
              ) : activeComponent === "SeeMenuAdmin" ? (
                <SeeMenuAdmin />
              ) : activeComponent === "AccountSettings" ? (
                <AccountSettings userid={userid} SetIsLoggedIn={setIsLoggedIn} />
              ) : activeComponent === "MyOrders" ? (
                <OrderHistory userid={userid} />
              ): activeComponent === "ReadFeedback" ? (
                <ReadFeedbacks />
              ) : !isLoggedIn ? (
                <LoginForm toggleLoginPage={toggleLoginPage} />
              ) : null}
            </div>
          </div>
        )}
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;

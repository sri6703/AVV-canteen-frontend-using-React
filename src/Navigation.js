import React from "react";
import "./Navigation.css";

function Navigation({ userType, handleLogout, setActiveComponent }) {
  return (
    <div className="navigation-container">
      <ul>
        <li onClick={() => setActiveComponent("Home")}>Home</li>
        {userType === "user" && ( <li onClick={() => setActiveComponent("AccountSettings")}>Account Settings</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("SeeMenu")}>View Menu</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("SeeCart")}>My Cart</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("MyOrders")}>My Orders</li>)}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("addItem")}>Add Item</li> )}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("Dashboard")}>Dashboard</li>)}
        <li onClick={handleLogout}>Log Out</li>
      </ul>
    </div>
  );
}


export default Navigation;

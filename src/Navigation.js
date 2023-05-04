import React from "react";
import "./Navigation.css";

function Navigation({ userType, handleLogout, setActiveComponent }) {
  return (
    <div className="navigation-container">
      <ul>
        <li>Home</li>
        {userType === "user" && <li>Edit Profile</li>}
        {userType === "user" && <li>View Menu</li>}
        {userType === "user" && <li>My Cart</li>}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("addItem")}>Add Item</li> )}
        {userType === "admin" && <li>Dashboard</li>}
        <li onClick={handleLogout}>Log Out</li>
      </ul>
    </div>
  );
}


export default Navigation;

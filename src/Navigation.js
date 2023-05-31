import React from "react";
import "./Navigation.css";
import { FaHome, FaCog, FaUtensils, FaShoppingCart, FaReceipt, FaPlus, FaListUl, FaRegComment, FaChartLine, FaSignOutAlt, FaComment } from 'react-icons/fa';


function Navigation({ userType, handleLogout, setActiveComponent }) {
  const handleLogoutClick = () => {
    setActiveComponent("Home");
    handleLogout();
  };
  
  return (
    <div className="navigation-container">
      <ul>
        <li onClick={() => setActiveComponent("Home")}><FaHome />Home</li>
        {userType === "user" && ( <li onClick={() => setActiveComponent("AccountSettings")}><FaCog />Account Settings</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("SeeMenu")}><FaUtensils />View Menu</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("SeeCart")}><FaShoppingCart />My Cart</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("MyOrders")}><FaReceipt />My Orders</li>)}
        {userType === "user" && ( <li onClick={() => setActiveComponent("SendFeedback")}><FaRegComment />Feedback</li>)}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("addItem")}><FaPlus />Add Item</li> )}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("SeeMenuAdmin")}><FaListUl />Current Menu</li> )}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("Dashboard")}><FaChartLine />Dashboard</li>)}
        {userType === "admin" && ( <li onClick={() => setActiveComponent("ReadFeedback")}><FaComment />See Feedback</li>)}
        <li onClick={handleLogoutClick}><FaSignOutAlt />Log Out</li>
      </ul>
    </div>
  );
}
export default Navigation;

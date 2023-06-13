import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeCart.css';
import Loading from "./loading.js";
import cartgif from "./img/cart.gif";
import PaymentForm from "./PaymentForm";

const SeeCart = ({ userid }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        name: item.item?.name,
        description: item.item?.description,
        price: item.item?.price,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity
      })).filter(item => item.name !== null);
      setIsLoading(false);
      // Calculate the total quantity for each item
      //sample commits
    const groupedItems = data.reduce((acc, item) => {
        const existingItem = acc.find(i => i._id === item._id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      setCartItems(groupedItems);

      // Calculate total price
      const totalPrice = groupedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setIsLoading(true);
      // Delete the item from the cart
      await axios.delete(`/addtocart/${itemId}`);
      setIsLoading(false);

      // Update the cartItems state by filtering out the deleted item
      setCartItems(cartItems.filter(item => item._id !== itemId));

      // Call fetchCartItems again to recalculate the total price
      fetchCartItems();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteAllItems = async () => {
    try {
      // Retrieve the current items in the cart
      setIsLoading(true);
      const response = await axios.get(`/addtocart/${userid}`);
      const data = response.data.map(item => ({
        _id: item._id,
        id: item.item?._id,
        quantity: item.quantity,
        existingQuantity: item.item?.exist_quantity,
      }));
      setIsLoading(false);
      setIsLoading(true);

      // Update the existing quantities of all items
      for (const item of data) {
        const { id, existingQuantity, quantity } = item;
        // Make a PATCH request to update the existing quantity
        await axios.patch(`canteen/${id}/${existingQuantity + quantity}`);
      }
      setIsLoading(false);
      // Delete all items from the cart
      setIsLoading(true);
      await axios.delete('/addtocart');
      setIsLoading(false);
      // Update the cartItems state and total price
      setCartItems([]);
      setTotalPrice(0);

    } catch (error) {
      console.error(error);
    }
  };
  
    const placeOrder = () => {
      setIsPaymentOpen(true);
    };
  

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    const userId = userid;
    const cart = cartItems.map(({ _id, quantity }) => ({
      itemId: _id,
      quantity,
    }));
    setIsLoading(true);
    axios.post("/api/orders", { userId, cart })
      .then(() => {
        console.log("Order placed successfully");
        setIsPaymentOpen(false);
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setIsLoading(false);
      });
  };


  
  const handlePaymentCancel = () => {
    setIsPaymentOpen(false);
  };



  if (isLoading) {
    return <Loading />;
  }

  if (isPaymentOpen) {
    return (
      <div className="payment-page">
        <PaymentForm
          onSubmit={handlePaymentSubmit}
          onCancel={handlePaymentCancel}
          totalPrice={totalPrice}
        />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className='cart-header'>
        <h1>My Cart</h1>
        <img src={cartgif} alt="Cart" />
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button className='delete-btn' onClick={() => handleDeleteItem(item._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <button onClick={handleDeleteAllItems}>Delete All Items</button>
        <p>Total: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default SeeCart;

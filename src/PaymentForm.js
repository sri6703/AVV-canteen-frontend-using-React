import React from 'react';
import './PaymentForm.css';
import visaLogo from './img/visa.jpg';
import safekeyLogo from './img/safekey.jpg';

const PaymentForm = ({ onSubmit, onCancel, totalPrice }) => {
  return (
    <div className="payment-form-container">
      <h2 className="payment-form-heading">Payment Details</h2>
      <h4 className="payment-amount" > Rs.{totalPrice}</h4>
      <form className="payment-form" onSubmit={onSubmit}>
        <div className="form-group-pay">
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder="Enter card number" />
        </div>
        <div className="form-group-pay">
          <label htmlFor="card-holder">Card Holder</label>
          <input type="text" id="card-holder" placeholder="Enter card holder name" />
        </div>
        <div className="expiry-cvv">
          <div className="form-group-pay">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input type="text" id="expiry-date" placeholder="MM/YY" />
          </div>
          <div className="form-group-pay">
            <label htmlFor="cvv"> CVV </label>
            <input type="text" id="cvv" placeholder="CVV" />
          </div>
        </div>
        <div className="card-icons">
          <img src={visaLogo} alt="Visa" className="card-icon small" />
          <img src={safekeyLogo} alt="SafeKey" className="card-icon small" />
        </div>
        <br />
        <button className="submit-button-pay" type="submit">Pay Now</button>
        <button className="cancel-button-pay" type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default PaymentForm;

import React, { useState } from "react";
import axios from "axios";
import Loading from "./loading.js";

import './SendFeedback.css';

const SendFeedback = ({ userid }) => {
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackSubtype, setFeedbackSubtype] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleFeedbackTypeChange = (event) => {
    setFeedbackType(event.target.value);
  };

  const handleFeedbackSubtypeChange = (event) => {
    setFeedbackSubtype(event.target.value);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleAnonymousChange = (event) => {
    setAnonymous(event.target.checked);
  };

  const handleSubmit = () => {
    if (!feedbackType || !feedbackSubtype || feedbackText.length < 50) {
        setErrorMessage("Please fill in all required fields and provide at least 50 characters of feedback.");
        return;
      }
  
    const feedbackData = {
      userid: anonymous ? null : userid,
      feedbackType,
      feedbackSubtype,
      feedbackText,
    };

    // Perform your Axios POST request here
    setIsLoading(true);
    axios.post("/api/feedback", feedbackData)
    .then((response) => {
     console.log(response.data);
    // Reset form fields
    setFeedbackType("");
    setFeedbackSubtype("");
    setFeedbackText("");
    setAnonymous(false);
    setErrorMessage("");

    setIsLoading(false);
    })
    .catch((error) => {
    console.error(error);
    });

    // For the sake of this example, simply logging the feedback data
    console.log(feedbackData);

    // Reset form fields
    setFeedbackType("");
    setFeedbackSubtype("");
    setFeedbackText("");
    setAnonymous(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="send-feedback-container">
      <h1>Feedback</h1>
      <div className="send-feedback-form">
        <div>
        <label>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={handleAnonymousChange}
          />
          Send Anonymously
        </label>
      </div>
      <div>
        <label>
          Feedback Type:
          <select value={feedbackType} onChange={handleFeedbackTypeChange}>
            <option value="">Select a type</option>
            <option value="app">App</option>
            <option value="food">Food</option>
          </select>
        </label>
      </div>
      {feedbackType === "food" && (
        <div>
          <label>
            Feedback Subtype:
            <select
              value={feedbackSubtype}
              onChange={handleFeedbackSubtypeChange}
            >
              <option value="">Select a subtype</option>
              <option value="canteen1">Canteen 1</option>
              <option value="canteen2">Canteen 2</option>
              <option value="canteen3">Canteen 3</option>
            </select>
          </label>
        </div>
      )}
      {feedbackType === "app" && (
        <div>
          <label>
            Feedback Subtype:
            <select
              value={feedbackSubtype}
              onChange={handleFeedbackSubtypeChange}
            >
              <option value="">Select a subtype</option>
              <option value="bugs">Bugs</option>
              <option value="suggestions">Suggestions</option>
            </select>
          </label>
        </div>
      )}
      <div>
        <label>
          Feedback:
          <textarea
            value={feedbackText}
            onChange={handleFeedbackTextChange}
          ></textarea>
        </label>
      </div>
      <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default SendFeedback;

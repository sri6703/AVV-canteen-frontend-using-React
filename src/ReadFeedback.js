import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./loading.js";
import './ReadFeedback.css';

const ReadFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch feedbacks from the API using Axios
    axios.get("your-feedbacks-api-endpoint")
      .then(response => {
        // Update the feedbacks state with the fetched data
        setFeedbacks(response.data);
        setIsLoading(true);
      })
      .catch(error => {
        console.error("Error fetching feedbacks:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteFeedback = (feedbackId) => {
    // Send delete request to the API for the specified feedback ID
    axios.delete(`your-feedbacks-api-endpoint/${feedbackId}`)
      .then(response => {
        // Filter out the deleted feedback from the feedbacks state
        setFeedbacks(prevFeedbacks =>
          prevFeedbacks.filter(feedback => feedback.id !== feedbackId)
        );
      })
      .catch(error => {
        console.error("Error deleting feedback:", error);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="read-feedbacks">
      <h1>Read Feedbacks</h1>
      <div className="feedbacks-list">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-item">
            <p className="user-id">{feedback.userid || "Anonymous"}</p>
            <p className="feedback-msg">{feedback.message}</p>
            <button onClick={() => handleDeleteFeedback(feedback.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadFeedbacks;

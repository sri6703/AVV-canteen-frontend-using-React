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
    axios.get("/feedback")
      .then(response => {
        // Update the feedbacks state with the fetched data
        setFeedbacks(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching feedbacks:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteFeedback = (regno) => {
    // Send delete request to the API for the specified feedback ID
    axios.delete(`/feedback/${regno}`)
      .then(response => {
        // Filter out the deleted feedback from the feedbacks state
        setFeedbacks(prevFeedbacks =>
          prevFeedbacks.filter(feedback => feedback.regno !== regno)
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
            <p className="user-id">{feedback.regno || "Anonymous"}</p>
            <p className="feedback-msg">{feedback.content}</p>
            <button onClick={() => handleDeleteFeedback(feedback.regno)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadFeedbacks;

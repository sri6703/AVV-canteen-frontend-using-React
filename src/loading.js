import React from 'react';
import './Loading.css';
import loadingGif from './img/loading.gif';

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingGif} alt="Loading" className="loading-gif" />
    </div>
  );
};

export default Loading;

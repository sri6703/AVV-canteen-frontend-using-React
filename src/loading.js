import React from 'react';
import './Loading.css';
import Lottie from 'lottie-react-web';
import loadingAnimation from './img/animations/loading_image.json';

const Loading = () => {
  return (
    <div className="loading-container">
      <Lottie
        options={{
          animationData: loadingAnimation, 
          loop: true,
        }}
        width={200} // Adjust the width of the animation as needed
        height={200} // Adjust the height of the animation as needed
      />
    </div>
  );
};

export default Loading;

import React from 'react';
import './Loading.css';
import Lottie from 'lottie-react-web';
import loadingAnimation from './img/animations/loading_image.json';

const Loading = ({a}) => {
  const containerStyle = a !== 1 ? { position: 'relative' } : { position: 'fixed' };
  return (
    <div className="loading-container" style={containerStyle}>
      <Lottie
        options={{
          animationData: loadingAnimation,
          loop: true,
        }}
        width={200} // Adjust the width of the animation as needed
        height={200} // Adjust the height of the animation as needed
      />
      <p className="loading-text">Please wait, cooking...</p>
    </div>
  );
};

export default Loading;

import React from 'react';

const PinVisibleRenderer = () => {
  const toggleClickHandler = () => {
    alert('Unfollow');
  };

  return (
    <div>
      <button onClick={toggleClickHandler}>toggle</button>
    </div>
  );
};

export default PinVisibleRenderer;
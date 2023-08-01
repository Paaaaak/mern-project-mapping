import React from 'react';

const UnfollowRenderer = () => {
  const unfollowClickHandler = () => {
    alert('Unfollow');
  };

  return (
    <div>
      <button onClick={unfollowClickHandler}>Unfollow</button>
    </div>
  );
};

export default UnfollowRenderer;
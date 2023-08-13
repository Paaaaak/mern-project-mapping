import React from 'react';
import './Welcome.css';

const Welcome = (props) => {
  return (
    <div className={props.showWelcome ? 'welcome-container' : 'welcome-hidden-container'}>
        <span>Welcome {props.currentUser}!</span>
    </div>
  );
};

export default Welcome;
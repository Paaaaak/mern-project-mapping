import React from 'react';
import './Welcome.css';
import FootprintAnimation from '../assets/footprint-animation.gif';

const Welcome = (props) => {
  return (
    <div className={props.showWelcome ? 'welcome-container' : 'welcome-hidden-container'}>
      <div className='welcome-logo-container'>
        <div>
          <img src={FootprintAnimation} className='welcome-logo' alt='animation'></img>
          <span>Welcome {props.currentUser}!</span>
        </div>
      </div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
    </div>
  );
};

export default Welcome;
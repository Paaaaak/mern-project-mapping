import React from 'react';
import './Welcome.css';
import FootprintAnimation from '../assets/footprint-animation.gif';

const Welcome = (props) => {
  return (
    <div className={props.showWelcome ? 'welcome-container' : 'welcome-hidden-container'}>
      <div className='welcome-logo-container'>
        <img src={FootprintAnimation} alt='animation' style={{transform: 'scale(0.3)'}}></img>
        <span>Welcome {props.currentUser}!</span>
      </div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      {/* <div className="firework"></div>
      <div className="firework"></div> */}
    </div>
  );
};

export default Welcome;
import React from 'react';
import './Guide.css';
import { Cancel } from '@material-ui/icons'
import LeftClick from '../assets/left-click.png';
import RightClick from '../assets/right-click.png';
import MouseScrolling from '../assets/mouse-scrolling.png';
import MyLocation from '../assets/my-location.png';
import User from '../assets/user.png';

const Guide = (props) => {
  const cancelClickHandler = () => {
    props.cancelClick();
  };

  return (
    <div className='guide-modal'>
      <div className='guide-top'>
        <span className='guide-title'>Instructions</span>
        <Cancel className='guide-cancel' onClick={cancelClickHandler}></Cancel>
      </div>
      <div className='guide-container'>
        <div className='guide'>
          <div className='guide-icon'>
            <img src={LeftClick} />
            <span>
              <b>Left click</b>
            </span>
          </div>
          <label>
            ▶ You can use most features with left-click.<br></br>
            ▶ Click a pin and check out what people have reviewed at that location!<br></br>
            ▶ Left click and hold the map, and drag. You can move the camera to any place you want.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon'>
            <img src={RightClick} />
            <span>
              <b>Right click</b>
            </span>
          </div>
          <label>
            ▶ Right click the map, hold, and drag to any direction. You can rotate the map.<br></br>
            ▶ Right click the map where you want to mark the place. You can create new pop up.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon'>
            <img src={MouseScrolling} />
            <span><b>Scroll up and down</b></span>
          </div>
          <label>
            ▶ Scroll up to zoom in a map, scroll down to zoom out the map.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon' style={{ marginLeft: '10px' }}>
            <img src={MyLocation} style={{ transform: 'scale(0.55)' }} />
            <span style={{ marginLeft: '8px' }}>
              <b>Location button</b>
            </span>
          </div>
          <label>
            ▶ Its in the top left corner next to search box! When you click it, the camera will slowly move to where you are right now.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon' style={{ marginLeft: '10px' }}>
            <img src={User} style={{ transform: 'scale(0.65)' }}/>
            <span style={{ marginLeft: '8px' }}><b>User panel button</b></span>
          </div>
          <label>
            ▶ It's user panel! Click on the button in the top right corner.<br></br>
            ▶ You are able to find some options to set profile picture, check friends list, and logout.<br></br>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Guide;
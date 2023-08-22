import React from 'react';
import './Guide.css';
import {Cancel} from '@material-ui/icons'
import LeftClick from '../assets/left-click.png';
import RightClick from '../assets/right-click.png';
import MouseScrolling from '../assets/mouse-scrolling.png';
import MyLocation from '../assets/my-location.png';

const Guide = (props) => {
  const cancelClickHandler = () => {
    props.cancelClick();
  };

  return (
    <div className='guide-modal'>
      <Cancel className='guide-cancel' onClick={cancelClickHandler}></Cancel>
      <div className='guide'>
        <div className='guide-icon'>
          <img src={LeftClick}/>
          <span>
            <b>Left click</b>
          </span>
        </div>
        <label>
          ▶ Click a pin and check out the contents of the pin.<br></br>
          ▶ You can use most features by left clicking.<br></br>
          ▶ Left click the map, hold, and drag. You can move the map.<br></br>
        </label>
      </div>
      <div className='guide'>
        <div className='guide-icon'>
          <img src={RightClick}/>
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
          <img src={MouseScrolling}/>
          <span><b>Scroll up and down</b></span>
        </div>
        <label>
          ▶ Scroll up to zoom in a map, scroll down to zoom out the map.<br></br>
        </label>
      </div>
      <div className='guide'>
        <div className='guide-icon'>
          <img src={MyLocation}/>
          <span>
            <b>Location button</b>
          </span>
        </div>
        <label>
          ▶ Its next to search box. When you click it, the camera will move to where you are right now.<br></br>
        </label>
      </div>
    </div>
  );
}

export default Guide;
import React from 'react';
import './Guide.css';
import { Cancel } from '@material-ui/icons'
import LeftClick from '../assets/left-click.png';
import RightClick from '../assets/right-click.png';
import MouseScrolling from '../assets/mouse-scrolling.png';
import MyLocation from '../assets/my-location.png';
import User from '../assets/user.png';
import Follow from '../assets/follow.png';
import FriendsList from '../assets/friends-list.png';

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
            ▶ You can use most features by left-clicking.<br></br>
            ▶ Left click on a pin to see the reviews for a location.<br></br>
            ▶ Left click and drag the map to move in any direction.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon' style={{ marginLeft: '10px' }}>
            <img src={User} style={{ transform: 'scale(0.33)', marginLeft: '-14px' }}/>
            <span style={{ marginLeft: '-7px' }}><b>User panel button</b></span>
          </div>
          <label>
            ▶ Click on the person icon in the top right corner to access the user panel.<br></br>
            ▶ Here you can set your profile picture, access your friends list, or logout.<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon' style={{ marginLeft: '12px' }}>
            <img src={Follow} style={{ transform: 'scale(0.65)' }} />
            <span style={{ marginLeft: '8px' }}>
              <b>Follow friends!</b>
            </span>
          </div>
          <label>
            ▶ From the user panel, select ‘friends’ and search their username.   
            After pressing ‘follow’ you can share pins and see their reviews of places around the world!<br></br>
            (e.g. Search 'admin' and follow. You can see admin's pins on the map and the contents of each of them!)
            <img src={FriendsList} style={{ transform: 'scale(1)', marginTop: '10px' }} /><br></br>
            ▶ If you ever want to unfollow a friend you can press the ‘unfollow’ button from the ‘friends’ panel and their colored pins will disappear from your map. <br></br>
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
            ▶ You can rotate the map by right-clicking and dragging in any direction.<br></br>
            ▶ Right click to drop a pin on a location and add a review!<br></br>
          </label>
        </div>
        <div className='guide'>
          <div className='guide-icon'>
            <img src={MouseScrolling} />
            <span><b>Scroll up and down</b></span>
          </div>
          <label>
            ▶ Scroll up to zoom in on a map, and scroll down to zoom out of the map.<br></br>
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
            ▶ If you press the 'location button' in the top left corner, the map will slowly travel to your current location.<br></br>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Guide;
import React from 'react';
import './Guide.css';
import {Cancel} from '@material-ui/icons'
import LeftClick from '../assets/left-click.png';
import RightClick from '../assets/right-click.png';
import MouseScrolling from '../assets/mouse-scrolling.png';

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
        <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur possimus ex quod doloremque. Eum fugiat consequatur atque mollitia earum placeat, rerum, itaque labore voluptatibus, quidem quos magni dolores sed recusandae!</label>
      </div>
      <div className='guide'>
        <div className='guide-icon'>
          <img src={RightClick}/>
          <span>
            <b>Right click</b>
          </span>
        </div>
        <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur possimus ex quod doloremque. Eum fugiat consequatur atque mollitia earum placeat, rerum, itaque labore voluptatibus, quidem quos magni dolores sed recusandae!</label>
      </div>
      <div className='guide'>
        <div className='guide-icon'>
          <img src={MouseScrolling}/>
          <span><b>Scroll up and down</b></span>
        </div>
        <label>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium optio, nulla aliquam, tempora itaque inventore ullam odio porro, nesciunt necessitatibus laborum. Fugit obcaecati voluptas, maxime nemo quidem impedit vero? Perferendis?</label>
      </div>
    </div>
  );
}

export default Guide;
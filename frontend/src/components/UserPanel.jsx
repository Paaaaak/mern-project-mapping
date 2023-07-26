import React, { useEffect } from 'react';
import './UserPanel.css';
import { useState } from "react";
import { motion } from "framer-motion";
import User from '../assets/user.png';

const UserPanel = (props) => {
  const show = {
    opacity: 1,
    display: "block"
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };

  const [showUser, setShowUser] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    // 0.5초 뒤에 실행
    const identifier = setTimeout(() => {
      console.log(color);
      // 색상 업데이트 axios 호출문 추가
    }, 500);
    
    return () => {
      clearTimeout(identifier);
    }
  }, [color]);

  return (
    <div className='user-panel'>
      <motion.button
        className='user-button'
        onClick={() => setShowUser(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <img className='user-img' src={User}></img>
      </motion.button>
      <motion.div className='user-info' animate={showUser ? show : hide}>
        <div className='info-container'>
          <span>Welcome <b>{props.currentUser}</b>!</span>
          <div className='info-color'>
            <span>Current pin color: </span>
            <input type='color' onChange={(event) => setColor(event.target.value)}></input>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className='button friend-list'
            onClick={() => props.setShowFriend(prev => !prev)}>
              Friends
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className='button logout' 
            onClick={props.logoutClick}>
              Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPanel;
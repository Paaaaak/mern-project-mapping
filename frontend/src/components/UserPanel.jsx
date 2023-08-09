import React, { useContext, useEffect } from 'react';
import './UserPanel.css';
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import User from '../assets/user.png';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

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
  const colorRef = useRef(null);
  const {currentUser, currentUserId} = useContext(UserContext);

  useEffect(() => {
    // 0.5초 뒤에 실행
    const identifier = setTimeout(async () => {
      colorRef.current.value = props.color;
      if (currentUserId !== 'null') {
        // 색상 업데이트 axios 호출문 추가
        console.log('Color to change:', colorRef.current.value);
        await axios.put('/users/' + currentUserId, { color: colorRef.current.value });
        await axios.put('/pins/' + currentUserId, { color: colorRef.current.value });
        props.setColor(colorRef.current.value);
      }
    }, 500);
    
    return () => {
      clearTimeout(identifier);
    }
  }, [props.color]);

  const logoutClickHandler = () => {
    props.logoutClick();
    setShowUser(false);
  };

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
          <span>Welcome <b>{currentUser}</b>!</span>
          <div className='info-color'>
            <span>Current pin color: </span>
            <input type='color' ref={colorRef} onChange={(event) => props.setColor(event.target.value)}></input>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className='button friends'
            onClick={() => props.setShowFriend(prev => !prev)}>
              Friends
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className='button logout' 
            onClick={logoutClickHandler}>
              Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPanel;
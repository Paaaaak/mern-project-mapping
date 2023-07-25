import React from 'react';
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
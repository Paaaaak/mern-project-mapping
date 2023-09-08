import React, { useContext, useEffect } from 'react';
import './UserPanel.css';
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import User from '../assets/user.png';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useDropzone } from 'react-dropzone';

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
      if (currentUserId !== null && currentUserId !== 'null') {
        // 색상 업데이트 axios 호출문 추가
        await axios.put('/api/users/' + currentUserId, { color: colorRef.current.value });
        await axios.put('/api/pins/' + currentUserId, { color: colorRef.current.value });
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

  const [selectedImage, setSelectedImage] = useState(null);
  const imageNameRef = useRef(null);

  const imageSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log('Form data:', currentUserId, selectedImage);
    formData.append('userId', currentUserId);
    formData.append('image', selectedImage);
    axios.post('/api/users/upload', formData)
      .then(res => {
        console.log(res);
        setSelectedImage(null);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setSelectedImage(acceptedFiles[0]);
    imageNameRef.current.textContent = acceptedFiles[0].name;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='user-panel'>
      <motion.div
        title='User information'
        className='user-button'
        onClick={() => setShowUser(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        {props.profileImage ? (
          <img className='user-img' src={'http://15.164.216.205:1035' + props.profileImage} alt="Image"></img>
        ) : (
          <img className='user-img' src={User}></img>
        )}
      </motion.div>
      <motion.div className='user-info' animate={showUser ? show : hide}>
        <div className='info-container'>
          <span>Welcome <b>{currentUser}</b>!</span>
          {/* <div>
            <span>Remove profile picture:</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='button remove'
              onClick={null}>
              Remove profile
            </motion.button>
          </div> */}
          <div className='info-image'>
            <span>Change profile picture:</span>
            <form onSubmit={imageSubmitHandler} encType='multipart/form-data'>
              <div className="file-upload">
                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the image file here!</p> : <p>Drag and drop a file <br></br> or click to select.</p>}
                  {selectedImage && <p ref={imageNameRef} style={{fontWeight: 'bold', color: 'blue'}}></p>}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='button save'
                style={{marginTop: '.5rem'}}
                type='submit'>
                Save
              </motion.button>
            </form>
          </div>
          <div className='info-color'>
            <span>Current pin color: </span>
            <div style={{display: 'flex', alignContent: 'center'}}>
              <input type='color' ref={colorRef} onChange={(event) => props.setColor(event.target.value)}></input>
              &nbsp;&nbsp;<span>← Click and change!</span>
            </div>
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
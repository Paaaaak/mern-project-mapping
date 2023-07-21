import React, {useState, useRef} from 'react';
import './Login.css';
import Footprint from '../assets/footprint.png';
import axios from 'axios';
import {Cancel} from '@material-ui/icons'

const Login = (props) => {
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('/users/login');
      console.log(res.data);
      setError(false);
    }
    catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const cancelClickHandler = () => {
    props.cancelClick();
    setError(false);
    console.log('Cancel clicked!');
  };

  return (
    <div className='login-container'>
      <div className='login-title'>
        <img src={Footprint}></img>
        <span>Footprint</span>
      </div>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='User name' ref={nameRef}></input>
        <input type='password' placeholder='Password' ref={passwordRef}></input>
        <button className='login-button'>Login</button>
      </form>
      <Cancel className='login-cancel' onClick={cancelClickHandler}></Cancel>
    </div>
  );
}

export default Login;
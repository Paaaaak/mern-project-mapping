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
    const loginUser = {
      username: nameRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const res = await axios.post('/users/login', loginUser);
      console.log(res.data);
      setError(false);
    }
    catch (error) {
      console.log(error);
      console.log('Error message: ' + error.response.data);
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
      <div className='login-result'>
        {error && <span className='failure'>Something went wrong! Contact to administrator</span>}
      </div>
      <Cancel className='login-cancel' onClick={cancelClickHandler}></Cancel>
    </div>
  );
}

export default Login;
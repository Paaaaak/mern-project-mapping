import React, {useState, useRef} from 'react';
import './Register.css';
import Footprint from '../assets/footprint.png';
import axios from 'axios';
import {Cancel} from '@material-ui/icons'

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const res = await axios.post('/users/register', newUser);
      console.log(res.data);
      setSuccess(true);
      setError(false);
    }
    catch (error) {
      console.log(error);
      setSuccess(false);
      setError(true);
    }
  };

  const cancelClickHandler = () => {
    console.log('Cancel clicked!');
  };

  return (
    <div className='register-container'>
      <div className='register-title'>
        <img src={Footprint}></img>
        <span>Footprint</span>
      </div>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='User name' ref={nameRef}></input>
        <input type='email' placeholder='Email' ref={emailRef}></input>
        <input type='password' placeholder='Password' ref={passwordRef}></input>
        <button className='register-button'>Register</button>
        <div className='register-result'>
          {success && <span className='success'>Successfull. You can login now!</span>}
          {error && <span className='failure'>Something went wrong! Contact to administrator</span>}
        </div>
      </form>
      <Cancel className='register-cancel' onClick={cancelClickHandler}></Cancel>
    </div>
  );
}

export default Register;
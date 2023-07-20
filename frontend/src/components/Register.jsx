import React from 'react';
import './Register.css';
import Footprint from '../assets/footprint.png';

const Register = () => {
  return (
    <div className='register-container'>
        <div className='register-title'>
            <img src={Footprint}></img>
            <span>Footprint</span>
        </div>
        <form>
            <input type='text' placeholder='User name'></input>
            <input type='email' placeholder='Email'></input>
            <input type='password' placeholder='Password'></input>
            <button>Register</button>
        </form>
    </div>
  );
}

export default Register;
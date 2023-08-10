import React, {useState, useRef} from 'react';
import './Register.css';
import Footprint from '../assets/footprint.png';
import axios from 'axios';
import ReactDom from 'react-dom';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Register = (props) => {
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

    console.log(newUser);

    try {
      const res = await axios.post('/users/register', newUser);
      console.log(res.data);
      setSuccess(true);
      setError(false);
    }
    catch (error) {
      console.log(error);
      console.log('Error message: ' + error.response.data);
      setSuccess(false);
      setError(true);
    }
  };

  const cancelClickHandler = () => {
    props.cancelClick();
    setSuccess(false);
    setError(false);
    console.log('Cancel clicked!');
  };

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <div className='register-container'>
          <div className='register-title'>
            <img src={Footprint}></img>
            <span>Footprint</span>
          </div>
          <h1>Register</h1>
          <form className='register-form' onSubmit={submitHandler}>
            {/* <input type='text' placeholder='User name' ref={nameRef}></input> */}
            <div>
              <label for='username'>Username</label>
              <div className='input-container'>
                <SupervisedUserCircleIcon style={{ transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)' }}></SupervisedUserCircleIcon>
                <input id='username' type='text' placeholder='User name' ref={nameRef}></input>
              </div>
            </div>
            <p className='register-warning'>※ Username can only contain lowercase alphabets and numbers</p>
            <div>
              <label for='email'>Email</label>
              <div className='input-container'>
                <MailOutlineIcon style={{ transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)' }}></MailOutlineIcon>
                <input type='email' placeholder='Email' ref={emailRef}></input>
              </div>
            </div>
            {/* <input type='password' placeholder='Password' minLength={6} ref={passwordRef}></input>
            <input type='password' placeholder='Confirm password' minLength={6}></input> */}
            <div>
              <label for='password'>Password</label>
              <div className='input-container'>
                <LockOpenIcon style={{transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)'}}></LockOpenIcon>
                <input id='password' type='password' placeholder='Type your password' ref={passwordRef}></input>
              </div>
            </div>
            <div>
              <label for='password-confirm'>Password Confirm</label>
              <div className='input-container'>
                <LockOpenIcon style={{transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)'}}></LockOpenIcon>
                <input id='password-confirm' type='password' placeholder='Confirm your password' ref={passwordRef}></input>
              </div>
            </div>
            <button className='register-button'>Register</button>
            <button className='register-cancel' onClick={cancelClickHandler}>Cancel</button>
            <div className='register-result'>
              {success && <span className='success'>Successfull. You can login now!</span>}
              {error && <span className='failure'>Something went wrong! Contact to administrator</span>}
            </div>
          </form>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}

export default Register;
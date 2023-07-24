import React, {useState, useRef} from 'react';
import './Login.css';
import Footprint from '../assets/footprint.png';
import axios from 'axios';
import ReactDom from 'react-dom';

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
      props.setCurrentUser(res.data.username);
      props.localStorage.setItem('user', res.data.username);
    }
    catch (error) {
      console.log(error);
      console.log('Error message: ' + error.response.data);
      setError(true);
    }
  };

  const registerClickHandler = () => {
    props.setShowRegister(true);
  }

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <div className='backdrop'></div>,
        document.getElementById('backdrop-root')
      )}
      {ReactDom.createPortal(
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
          <div className='login-register'>
            <span>Not a member? </span><span onClick={registerClickHandler}><b>Register here!</b></span>
          </div>
          <div className='login-result'>
            {error && <span className='failure'>Something went wrong! Contact to administrator</span>}
          </div>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}

export default Login;
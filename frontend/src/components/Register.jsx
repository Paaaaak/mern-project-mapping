import React, {useState, useRef, useEffect} from 'react';
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
  const [errorMessage, setErrorMessage] = useState(null);

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
      console.log('Error message: ' + error.response.data);
      setSuccess(false);
      setError(true);
      setErrorMessage('Something went wrong! Contact to administrator');
    }
  };

  const cancelClickHandler = () => {
    props.cancelClick();
    setSuccess(false);
    setError(false);
    console.log('Cancel clicked!');
  };

  useEffect(() => {
    if (success) {
      // 성공 이벤트 렌더링 및 로그인 페이지로 리다이렉트
    }
  }, [success]);

  // Username 입력 시 특수문자 및 대문자를 포함하면 경고
  // Email 입력 시 Email Form과 일치하지 않으면 경고
  // Password 입력하지 않고 Confirm Password부터 입력 시 경고 및 Password로 Focus
  // Register 버튼 클릭 시 Username이 중복되는지 체크

  // Register 성공됐을 경우 Login 페이지로 Redirect

  // Username can only contain lowercase alphabets and numbers
  // Please enter the password first 
  // Write the correct email form including @
  // Username is duplicated 

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
            <div>
              <label for='username'>Username</label>
              <div className='input-container'>
                <SupervisedUserCircleIcon style={{ transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)' }}></SupervisedUserCircleIcon>
                <input id='username' type='text' placeholder='User name' ref={nameRef}></input>
              </div>
            </div>
            <div>
              <label for='email'>Email</label>
              <div className='input-container'>
                <MailOutlineIcon style={{ transform: 'scale(0.8)', marginLeft: '5px', color: 'rgb(126, 125, 125)' }}></MailOutlineIcon>
                <input type='email' placeholder='Email' ref={emailRef}></input>
              </div>
            </div>
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
              {error && <span className='failure'>{errorMessage}</span>}
            </div>
          </form>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}

export default Register;
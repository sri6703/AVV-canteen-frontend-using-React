import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaUserShield, FaVoicemail } from 'react-icons/fa';
import axios from 'axios';
import './LoginForm.css';

function LoginForm(props) {
  const { handleLoginSuccess } = props;
  const [formType, setFormType] = useState('login');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupId, setSignupId] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [userType, setUserType] = useState('user');

  useEffect(() => {
    setLoginStatus('');
  }, [formType]);

  const handleLoginTypeChange = (e) => {
    setUserType(e.target.value);
  };
  
 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const URL = userType === 'user' ? 'login-page/' : 'admin-login-page/';
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      const isLoginValid = userType === 'user'
        ? data.some((i) => i.regno === loginId)
        : data.some((i) => i.email === loginId);
      if (isLoginValid) {
        const isPasswordCorrect = data.some((i) => i.pwd === loginPassword);
        if (isPasswordCorrect) {
          setLoginStatus('Logged in Successfully!!');
          setUserType(userType);
          handleLoginSuccess(userType, loginId);
        } else {
          setLoginStatus('Password incorrect!'); 
        }
      } else { 
        setLoginStatus('User ID incorrect!');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`-]).{8,}$/;
    // Validate new password against regex
    if (!passwordRegex.test(signupPassword)) {
      setLoginStatus('Password must have minimum 8 characters, with atleast 1 uppercase, 1 lowercase, 1 number, & 1 symbol');
      return;
    }

    //valididate mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      setLoginStatus('Please enter a valid email address');
      return;
    }

    const name = signupName;
    const pwd = signupPassword;
    const mail = signupEmail;
    const regno = signupId;

    const data = {
      name: name,
      regno: regno,
      email: mail,
      pwd: pwd,
    };
    const URL = 'login-page/';
    const response = await axios.post(URL, data);
    setLoginStatus(response.data.message);
  };

  const handleForgotPassword = async (email) => {
    try {
      const response = await axios.post(`login-page/${email}`);
      const link = response.data;
      console.log(link); // Log the link received from the server
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormType = () => {
    setFormType((prevFormType) =>
      prevFormType === 'login' ? 'signup' : 'login'
    );
  };

  return (
    <div className="login-form-container">
      <h1>
        {formType === 'login'
          ? 'Login'
          : formType === 'signup'
          ? 'Sign Up'
          : formType === 'forgot'
          ? 'Forgot Password'
          : 'Forgot Password' // dummy else
        }
      </h1>
      <form
        onSubmit={
          formType === 'login'
            ? handleLoginSubmit
            : formType === 'signup'
            ? handleSignupSubmit
            : formType === 'forgot'
            ? handleForgotPassword(loginId)
            : () => handleForgotPassword // dummy else block
        }
      >
        {formType === 'signup' && (
          <>
            <label>
            <FaUser />
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </label>
            <label>
            <FaIdCard />
              <input
                type="text"
                placeholder="ID"
                value={signupId}
                onChange={(e) => setSignupId(e.target.value)}
              />
            </label>
            <label>
            <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </label>
            <label>
            <FaLock />
              <input
                type="password"
                value={signupPassword}
                placeholder="Password"
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </label>
            <p className='status-msg' style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>
            <br />
            <button type="submit">Sign Up</button>
          </>
        )}
        {formType === 'login' && (
          <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              value="user"
              checked={userType === 'user'}
              onChange={() => setUserType('user')}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaUser style={{ marginRight: '5px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>User</span>
              </div>
            </div>
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={userType === 'admin'}
              onChange={() => setUserType('admin')}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaUserShield style={{ marginRight: '5px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Admin</span>
              </div>
            </div>
          </label>
        </div>
            <label>
            <FaUser/>
              <input
                type="text"
                placeholder="User ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </label>
            <label>
            <FaLock />
              <input
                type="password"
                value={loginPassword}
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setFormType('forgot')}>
              Forgot Password
            </button>
            <p className='status-msg' style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>
          </>
        )}
      {formType === 'forgot' && (
        <>
            <p>Enter your registered mailID to get password reset link.</p>
            <hr />
            <label>
              <FaEnvelope />
              <input
                type="text"
                value={loginId}
                placeholder='Email'
                onChange={(e) => setLoginId(e.target.value)}
              />
            </label>
            <button type="button" onClick={() => handleForgotPassword(loginId)}>
              Send Mail
            </button>
            <br />
        </>
      )}
      </form>
      <button onClick={toggleFormType}>
        { formType === 'login'
          ? "Don't have an account? Sign up"
          : formType === 'signup'
          ? 'Already have an account? Log In'
          : formType === 'forgot'
          ? "Go back to login"
          : formType === 'login'}
      </button>
    </div>
  );
}

export default LoginForm;
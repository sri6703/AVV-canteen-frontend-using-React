import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaUserShield } from 'react-icons/fa';
import axios from 'axios';
import './LoginForm.css';
import Loading from "./loading.js";

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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoginStatus('');
  }, [formType]);
 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const URL = userType === 'user' ? 'login-page/' : 'admin-login-page/';
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      setIsLoading(false);
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
      setIsLoading(false);
    }

  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-=.,]).{8,}$/;
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
    setIsLoading(true);
    const response = await axios.post(URL, data);
    setLoginStatus(response.data.message);
    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    const email = loginId;
    try {
      //setIsLoading(true);
      const response = await axios.post(`login-page/${email}`);
      const link = response.data;
      setIsLoading(false);
      console.log(link);
      alert("Email Sent !") // Log the link received from the server
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    setFormType((prevFormType) =>
      prevFormType === 'login' ? 'signup' : 'login'
    );
  };

  if (isLoading) {
    return <Loading />;
  }

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
            ? handleForgotPassword
            : console.log("oops!")// dummy else block
        }
      >
        {formType === 'signup' && (
          <>
            <div className="input-container">
            <FaUser />
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                required
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div className="input-container">
            <FaIdCard />
              <input
                type="text"
                placeholder="ID"
                value={signupId}
                required
                onChange={(e) => setSignupId(e.target.value)}
              />
            </div>
            <div className="input-container">
            <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                required
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
            <FaLock />
              <input
                type="password"
                value={signupPassword}
                placeholder="Password"
                required
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>

            <p className='status-msg' style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>
            <br />
            <button class="reactive-button" type="submit">Create Account</button>
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
        <div className="input-container">
          <label htmlFor="user-id">
            <FaUser />
          </label>
          <input
            type="text"
            id="user-id"
            placeholder="User ID"
            value={loginId}
            required
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <FaLock />
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={loginPassword}
            required
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button class="reactive-button" type="submit" style={{ marginTop: '10px'}}>
          Log In
        </button>
        <button class="reactive-button" type="button" onClick={() => setFormType('forgot')} style={{ marginTop: '10px' }}>
          Forgot Password
        </button>
        <p className='status-msg' style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden', marginTop: '10px' }}>{loginStatus}</p>

          </>
        )}
      {formType === 'forgot' && (
        <>
            <p>Enter your registered Email address to get password reset link.</p>
            <div className="input-container">
              <FaEnvelope />
              <input
                type="text"
                value={loginId}
                placeholder='Email'
                required
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
            <button class="reactive-button" type="submit" style={{ marginTop: '10px' }}>
  Send Mail
</button>

            <p className='status-msg' style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden', marginTop: '10px' }}>{loginStatus}</p>
            <br />
        </>
      )}
      </form>
      <button class="reactive-button" onClick={toggleFormType}>
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
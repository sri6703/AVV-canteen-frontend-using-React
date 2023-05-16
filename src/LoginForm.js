import React, { useState, useEffect } from 'react';
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
              Name:
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </label>
            <label>
              ID:
              <input
                type="text"
                value={signupId}
                onChange={(e) => setSignupId(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={signupPassword}
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
                  onChange={(handleLoginTypeChange) => setUserType('user')}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={(handleLoginTypeChange) => setUserType('admin')}
                />
                Admin
              </label>
            </div>
            <label>
              User Id:
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={loginPassword}
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
            <p>Dont worry! Password reset link is sent to your email</p>
            <hr />
            <label>
              Email Id:
              <input
                type="text"
                value={loginId}
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
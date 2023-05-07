import React, { useState ,useEffect } from 'react';
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const Item = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button> 
    </>
  );
};


function Loginform(props) {
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

  const handleLoginSubmit = async (e) => {
    const URL = "login-page/"
    e.preventDefault();
    const result = await axios.get(URL)
    console.log(result.data)
    const m1 = result.data.some(i => i.email == loginId)
    if (m1)
    {
      const m2 = result.data.some(i =>  i.pwd==loginPassword )
      if (m2)
      {setLoginStatus("Logged in Successfully!!");
      setUserType(userType);
      handleLoginSuccess(userType);}
      else 
      {setLoginStatus("Password incorrect!");}
    }
    else 
    {setLoginStatus("Email ID incorrect!");}
  };
  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const name = signupName; 
    const pwd = signupPassword;
    const mail = signupEmail;
    const regno = signupId;

    const data = {
      name: name,
      regno: regno,
      email: mail,
      pwd: pwd
    };
    const URL = "login-page/";
  const response = await axios.post(URL, data);
  setLoginStatus(response.data.message);
   
  };

  const handleforgotpassword = async (e) => {
        console.log("hello")


  };

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="login-form-container">
      <h1>
  {formType === 'login'
    ? 'Login'
    : formType === 'signup'
    ? 'Sign Up'
    : formType === 'back'
    ? 'Back'
    : 'Forgot Password'}
</h1>
      <form onSubmit={
          formType === 'login'
            ? handleLoginSubmit
            : formType === 'signup'
            ? handleSignupSubmit
            : formType === 'back'
            ? Item
            : handleforgotpassword
        }>
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
            <button type="submit">Sign Up</button>
            <p style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>

          </>
        )}
        {formType === 'login' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>User Type:</label>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  value="user"
                  checked={userType === 'user'}
                  onChange={() => setUserType('user')}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={() => setUserType('admin')}
                />
                Admin
              </label>
            </div>
            <label>
              Email Id:
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
            <a href="#" class="previous round" onClick={() => setFormType('back')}>&#8249;</a>
            <a href="#" class="next round" onClick={() => setFormType('back')}>&#8250;</a>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setFormType('forgot')}>Forgot Password</button>
            <p style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>

          </>
        )}
      </form>
      {
        formType==="forgot" && (
          <>
            <p>Forgot Password Form</p>
            <button type="button" onClick={() => setFormType('login')}>
              Go back to login
            </button>
          </>
        )
      }
      <button onClick={toggleFormType}>
        {formType === 'login'
          ? "Don't have an account? Sign up"
          : formType === 'signup'
          ? 'Already have an account? Log In'
          : formType === 'back'
          ?'Go back to login'
        :'forgot password'}
      </button>
    </div>
  );
}

export default Loginform;

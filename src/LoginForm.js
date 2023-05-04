import React, { useState ,useEffect } from 'react';
import axios from "axios";

function Loginform() {
  const [formType, setFormType] = useState('login');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupId, setSignupId] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

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
      {setLoginStatus("Logged in Successfully!!");}
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

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="login-form-container">
      <h1>{formType === 'login' ? 'Login' : 'Sign Up'}</h1>
      {formType === 'login' ? (
        <form onSubmit={handleLoginSubmit}>
          <label>
            ID:
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long"
              required
            />
          </label>
          <button type="submit">Log In</button>
          <p style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>
        </form>
  
      ) : 
      (
        
        <form onSubmit={handleSignupSubmit}>
  <label>
    Name:
    <input
      type="text"
      value={signupName}
      onChange={(e) => setSignupName(e.target.value)}
      required
    />
  </label>
  <label>
    ID:
    <input
      type="text"
      value={signupId}
      onChange={(e) => setSignupId(e.target.value)}
      required
    />
  </label>
  <label>
    Email:
    <input
      type="email"
      value={signupEmail}
      onChange={(e) => setSignupEmail(e.target.value)}
      required
    />
  </label>
  <label>
    Password:
    <input
      type="password"
      value={signupPassword}
      onChange={(e) => setSignupPassword(e.target.value)}
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 or more characters"
      required
    />
  </label>
  <button type="submit">Sign Up</button>
  <p style={{ visibility: loginStatus.length !== 0 ? 'visible' : 'hidden' }}>{loginStatus}</p>
</form>

      )}
      <button onClick={toggleFormType}>
        {formType === 'login' ? 'Don\'t have a Account? Sign up' : 'Already have a account? Log In'}
      </button>
    </div>
  );
}

export default Loginform;

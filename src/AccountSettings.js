import React, { useState } from 'react';
import axios from 'axios';
import './AccountSettings.css';
import { useEffect } from 'react';
import Loading from "./loading.js";

const AccountSettings = ({ SetIsLoggedIn, userid }) => {
  const [name, setName] = useState('');
  const [regno, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [delPassword, setDelPassword] = useState('');
  const [ editStatus, seteditStatus] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  
    const fetchUserData = async () => {
      try {
        // Make an API call or fetch data from a source
	
        const userData = await getUserData(userid);

        // Update the state variables with the retrieved data
        setName(userData.name);
        setRegNo(userData.regno);
        setEmail(userData.email);
        setPhoneNo(userData.phoneno);
        setGender(userData.gender);
        setAddress(userData.address);
      } catch (error) {
        
      }
    };

  useEffect(() => {
    fetchUserData();
  }, [userid]);

  const getUserData = async (userid) => {
    const response = await axios.get(`login-page/${userid}`);
    return response.data;
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

  const data = {
    name: name,
    regno: regno,
    email: email,
    pwd: currentPassword,
    phoneno:phoneno,
    gender:gender,
    address:address
  };

  const datapwd = { regno: regno, newpwd: newPassword, confpwd: confirmNewPassword };
  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    
    try {

      // Call API to change user password using state values
      const URL = `login-page/${userid}/${currentPassword}`;

      setIsLoading(true);
      const response = await axios.patch(URL, datapwd);
      setIsLoading(false);

      console.log(response);
      alert(response.data.message);
      setIsChangePassword(false); // Reset the state after successful password change
      await fetchUserData();
    } catch (error) {
      console.error('Error changing password:', error);
      console.log(datapwd);
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleEditProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call API to update user profile using state values
      const URL = `login-page/${userid}`;

      setIsLoading(true);
      const response = await axios.patch(URL, data);
      setIsLoading(false);

      console.log(response.data);
      alert('Profile updated successfully!');
      seteditStatus('Profile updated successfully!');
      setIsEditProfile(false); // Hide the edit form after successful update
      await fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      console.log('Response data:', error.response.data);
      setIsLoading(false);
    }
  };

  const deldata= {delpwd: delPassword};
  const handleDeleteAccountSubmit = async (event) => {
    event.preventDefault();
    if (deleteConfirmation === 'DELETE') {
      try {
        // Get the rollno value from your application logic or user input
        // Replace getRollno() with your logic
        // Call API to delete user account using the rollno value
        const URL = `login-page/${userid}`;

        setIsLoading(true);
        const response = await axios.delete(URL,deldata);
        setIsLoading(false);
        alert(response.data.message);
        // TODO: Logout user
        SetIsLoggedIn(false);
        userid = '';
      } catch (error) {
        console.error('Error deleting account:', error);
        console.log(delPassword);
        console.log();
        alert(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      alert('Please confirm delete by typing DELETE in the confirmation box.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="account-settings-container">
      <h1>Account Settings</h1>
      <div className="container-in">
        <h2>My Profile</h2>
        {!isEditProfile ? (
          <div className="display-profile">
            <div>User ID: {userid}</div>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            <br />
            {!isChangePassword && !isDeleteAccount && (
              <div>
                <button onClick={() => setIsEditProfile(true)}>Edit</button>
                <button onClick={() => setIsChangePassword(true)}>Change Password</button>
                <button onClick={() => setIsDeleteAccount(true)}>Delete Account</button>
              </div>
            )}
          </div>
        ) : (
          <form className="container-in-edit-profile" onSubmit={handleEditProfileSubmit}>
            <div id="float-label" className="form-group">
              <label htmlFor="userid">User ID: </label>
              <input type="text" id="userid" value={userid} readOnly disabled />
            </div>
            <div id="float-label" className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div id="float-label" className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="mail"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="phoneno">Phoneno: </label>
              <input
                type="text"
                id="phoneno"
                value={phoneno}
                onChange={(event) => setPhoneNo(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="gender">Gender: </label>
              <input
                type="text"
                id="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="address">address: </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <br />
            <div className="button-container">
              <button type="submit">Save</button>
              <button className="Cancel" onClick={() => setIsEditProfile(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      {isChangePassword && (
        <form className="container-in" onSubmit={handleChangePasswordSubmit}>
          <div id="float-label">
            <label htmlFor="current-password">Current Password: </label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div id="float-label" className="form-group">
            <label htmlFor="new-password">New Password: </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div id="float-label" className="form-group">
            <label htmlFor="confirm-new-password">Confirm New Password: </label>
            <input
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </div>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <div className="button-container">
            <button type="submit">Change Password</button>
            <button className="Cancel"  onClick={() => setIsChangePassword(false)}>Cancel</button>
          </div>
        </form>
      )}

      {isDeleteAccount && (
        <form className="container-in" onSubmit={handleDeleteAccountSubmit}>
          <div id="float-label" className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={delPassword}
              onChange={(event) => setDelPassword(event.target.value)}
            />
          </div>
          <div id="float-label" className="form-group">
            <label htmlFor="delete-confirmation">Type DELETE to confirm deletion: </label>
            <input
              type="text"
              id="delete-confirmation"
              value={deleteConfirmation}
              onChange={(event) => setDeleteConfirmation(event.target.value)}
            />
          </div>
          <br />
          <div className="button-container">
            <button type="submit">Delete Account</button>
            <button className="Cancel"  onClick={() => setIsDeleteAccount(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountSettings;

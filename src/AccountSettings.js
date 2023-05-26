import React, { useState } from 'react';
import axios from 'axios';
import './AccountSettings.css';
import Loading from "./loading.js";

const AccountSettings = ({ SetIsLoggedIn, userid }) => {
  const [name, setName] = useState('John Doe');
  const [phoneno, setphoneno] = useState('John Doe');
  const [gender, setgender] = useState('John Doe');
  const [address, setaddress] = useState('John Doe');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('sample@gmail.com');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`-]).{8,}$/;
    // Validate new password against regex
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Password must have a minimum of 8 characters, with at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
      );
      return;
    }

    setErrorMessage('');
    try {
      // Call API to change user password using state values
      setIsLoading(true);
      const response = await axios.put(
        `login-page/${userid}/${currentPassword}/${newPassword}`
      );
      setIsLoading(false);
      alert(response.data.message);
      setIsChangePassword(false); // Reset the state after successful password change
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleEditProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Call API to update user profile using state values
      const response = await axios.patch(`login-page/${userid}`, { name,phoneno,address,gender });
      alert(response.data.message);
      setIsEditProfile(false); // Hide the edit form after successful update
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDeleteAccountSubmit = async (event) => {
    event.preventDefault();
    if (deleteConfirmation === 'DELETE') {
      try {
        // Get the rollno value from your application logic or user input
        // Replace getRollno() with your logic
        setIsLoading(true);
        // Call API to delete user account using the rollno value
        const response = await axios.delete(`login-page/${userid}`);
        alert(response.data.message);
        // TODO: Logout user
        SetIsLoggedIn(false);
        userid = '';
        setIsLoading(false);
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
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
            <div>Email: {Email}</div>
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
                value={Email}
                onChange={(event) => setEmail(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="phoneno">Phoneno: </label>
              <input
                type="text"
                id="phoneno"
                value={phoneno}
                onChange={(event) => setphoneno(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="gender">Gender: </label>
              <input
                type="text"
                id="gender"
                value={gender}
                onChange={(event) => setgender(event.target.value)}
              />
              </div>
              <div id="float-label" className="form-group">
              <label htmlFor="address">address: </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(event) => setaddress(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

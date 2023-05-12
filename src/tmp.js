import React, { useState } from 'react';
import "./AccountSettings.css";

const AccountSettings = ({ userid }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [mobile, setMobile] = useState('1234567890');
  const [password, setPassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    // Call API to change user password using state values
  };

  const handleEditProfileSubmit = (event) => {
    event.preventDefault();
    // Call API to update user profile using state values
  };

  const handleDeleteAccountSubmit = (event) => {
    event.preventDefault();
    if (deleteConfirmation === 'DELETE') {
      // Call API to delete user account using userid and password values
      // and then logout user
    } else {
      alert('Please confirm delete by typing DELETE in the confirmation box.');
    }
  };

  return (
    <div className="account-settings-container" style={{height: 'auto'}}>
      <h1>Account Settings</h1>
      <div className='edit-profile-container'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleEditProfileSubmit} >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
        <br />
        <div>
            <button type="submit">Update Profile </button>
        </div>
      </form>
      </div>

      <div className='change-password-container'> 
      <h2>Change Password</h2>
      <form onSubmit={handleChangePasswordSubmit} >
        <div>
          <label htmlFor="current-password">Current Password: </label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-password">New Password: </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-new-password">Confirm New Password: </label>
          <input
            type="password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </div>
        <br />
        <div>
            <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
      
      <div className='delete-account-container'> 
      <h2>Delete Account</h2>
      <form onSubmit={handleDeleteAccountSubmit} >
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="delete-confirmation">Type DELETE to confirm deletion: </label>
          <input
            type="text"
            id="delete-confirmation"
            value={deleteConfirmation}
            onChange={(event) => setDeleteConfirmation(event.target.value)}
          />
        </div>
        <br />
        <div>
            <button type="submit">Delete Account</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AccountSettings;

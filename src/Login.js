import React, { useState } from 'react';
import Countries from './Components/Countries';
import Box from './Components/Box';
import { API_URL } from './constants';

const Login = ({ user }) => {
  // Tabs
  const [activeTab, setActiveTab] = useState(0);
  
  // Sign In variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up variables
  const [nameSU, setNameSU] = useState('');
  const [lastNameSU, setLastNameSU] = useState('');
  const [countrySU, setCountrySU] = useState(0);
  const [cellPhoneSU, setCellPhoneSU] = useState(0);
  const [emailSU, setEmailSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [confirmPasswordSU, setConfirmPasswordSU] = useState('');

  // Handle tab changing
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Gets data from sign in form, validates in DB and log into the app
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch(`${API_URL}/signin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },   
      }).then(
        (response) => response.json()
      ).then((data) => {
        if (data.success) {
          user.setItem('user', data.user.id);
          user.setItem('rol', data.user.id_rol);
          user.setItem('cart', JSON.stringify([]));
          window.location.reload();
        } else {
          alert('User does not exists')
        }
      }).catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Gets data from creation form, creates new user and log into the app
  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    try {
      if (countrySU === 0) {
        alert("Country is Required")
        return
      }

      if (passwordSU !== confirmPasswordSU) {
        alert("Password does not match");
        return
      }

      fetch(`${API_URL}/signup`, {
        method: 'post',
        body: JSON.stringify({
          'country': countrySU,
          'name': nameSU,
          'last_name': lastNameSU,
          'email': emailSU,
          'cell_phone': cellPhoneSU,
          'password': passwordSU,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(
        (response) => response.json()
      ).then((data) => {
        user.setItem('user', data.user.id);
        user.setItem('rol', 2);
        window.location.reload();
      }).catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Tabs component for handler action
  const tabs = [
    {
      title: 'Sign In',
      content: <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>Email</label>
            <input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='input-container'>
            <button type="submit">Sign In</button>
          </div>
        </form>
    },
    {
      title: 'Sign Up',
      content: <form onSubmit={handleSubmitSignUp}>
          <div className='input-container'>
            <label>Name</label>
            <input placeholder="Enter your name" type="text" value={nameSU} onChange={(e) => setNameSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Last Name</label>
            <input placeholder="Enter your Last Name" type="text" value={lastNameSU} onChange={(e) => setLastNameSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Country</label>
            <Countries setValue={setCountrySU}></Countries>
          </div>
          <div className='input-container'>
            <label>Cell Phone</label>
            <input placeholder="Enter your Phone" type="number" value={cellPhoneSU} onChange={(e) => setCellPhoneSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Email</label>
            <input placeholder="Enter your email" type="email" value={emailSU} onChange={(e) => setEmailSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input placeholder="Enter your password" type="password" value={passwordSU} onChange={(e) => setPasswordSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Confirm Password</label>
            <input placeholder="Enter your password" type="password" value={confirmPasswordSU} onChange={(e) => setConfirmPasswordSU(e.target.value)}/>
          </div>
          <div className='input-container'>
            <button type="submit">Sign Up</button>
          </div>
        </form>
    },
  ];

  // Returns Login component with tabs and the other elements integrated
  return (
    <div>
      <Box 
        header={tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            <h1>{tab.title}</h1>
          </button>
        ))} 
        body={tabs[activeTab].content}
      />
    </div>
  );
};

export default Login;

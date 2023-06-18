import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setRenderRegister, showLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (password.length < 4) {
      setErrorMessage('Minimum password length is 4 characters');
      return;
    }
    if (username.length < 2) {
      setErrorMessage('Minimum username length is 2 characters');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/users", {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.status === 201) {
        console.log('Registration successful');
        closeRegister();
      } else {
        const data = response.data;
        const { message } = data;
        setErrorMessage(message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error during registration');
    }
  };

  const closeRegister = () => {
    setRenderRegister(false);
    showLogin();
    setEmail('');
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form className="register-form">
        <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            minLength={2}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <div onClick={closeRegister}>Already have an account? Login</div>
        </form>
      </div>
    </>
  );
};

export default Register;

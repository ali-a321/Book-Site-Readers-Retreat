import React, { useState } from 'react';

const Register = ({ setRenderRegister, showLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (password.length < 4) {
      setErrorMessage('Minimum password length is 4 characters');
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        closeRegister();
      } else {
        const data = await response.json();
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
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form className="register-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
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

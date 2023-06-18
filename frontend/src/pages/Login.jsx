import React, { useState } from 'react';
import axios from 'axios';

function Login({ setRenderLogin, setRenderRegister }) {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        username,
        password,
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log('Login successful');
  
        try {
          const userResponse = await axios.get("http://localhost:8000/user", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (userResponse.status === 200) {
            console.log(userResponse);
            const userData = userResponse.data;
            const { username, id } = userData;
            console.log(userData);
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
            setUsername('');
            setPassword('');
            setError('');
          } else {
            setError('Error retrieving user details');
          }
        } catch (error) {
          setError('Error retrieving user details');
        }
  
        setRenderLogin(false);
      } 
    } catch (error) {
      setError('Error during login');
    }
  };

  const showRegister = () => {
    setRenderRegister(true);
    setRenderLogin(false);
    setUsername('');
    setPassword('');
    setError('');
  };


  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
          {error && <div className="error-message">{error}</div>}
          <div onClick={showRegister}>Don't have an account? Register here</div>
        </form>
      </div>
    </>
  );
}

export default Login;

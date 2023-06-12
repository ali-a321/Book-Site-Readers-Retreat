import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({setRenderLogin, setRenderRegister} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loggedUser, setloggedUser] = useState('');
    const handleLogin = async (e) => {
      e.preventDefault()
        try {
          const response = await fetch("http://localhost:8000/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          if (response.ok) {
            // Login successful
            const data = await response.json();
            const { token } = data;
            localStorage.setItem('token', token);
            console.log('Login successful');
      
            // Fetch user details using token
            try {
              const userResponse = await fetch("http://localhost:8000/user", {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              if (userResponse.ok) {
                console.log(userResponse)
                const userData = await userResponse.json();
                const {username, id } = userData
                console.log(userData)
                localStorage.setItem('id', id);
                localStorage.setItem('username', username);
                console.log(`Logged in user: ${username}`);
              } else {
                console.error('Error retrieving user details');
              }
            } catch (error) {
              console.error('Error retrieving user details:', error);
            }
      
            setRenderLogin(false)
          } else {
            // Login failed
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

  
      const showRegister = () => {
        setRenderRegister(true)
        setRenderLogin(false)
      }
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

            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <div onClick={() => showRegister()}>Don't have an account? Register here</div>
          </form>
        </div>
        
    </>
  )
}

export default Login
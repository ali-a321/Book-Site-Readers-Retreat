import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
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
        navigate('/login')
        
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registration:', error);
    }
  };

  return (
    <> 
    <div className='titleHeader'>
        <div> <h1 className='inventoryTittle' onClick={()=> navigate("/")} > Readers' Retreat </h1></div>
        </div>
    <div className="form-container">
    <h2>Register</h2>
    <form>
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

      <button type="button" onClick={handleRegister}>
        Register
      </button>
      <div onClick={()=> navigate("/login")}>Already have an account? Login </div>

    </form>
  </div>
  </>
  );
};

export default Register;

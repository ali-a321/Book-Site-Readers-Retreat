import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import githubLogo from "../images/githubLogo.png"

const Oauth = ({setUserData, userData, setRenderLogin, renderLogin}) => {
  

  const handleLogin = () => {
    const githubUrl = 'https://github.com/login/oauth/authorize';
    const clientId = 'ff31982da7a359a4de68';
    const redirectUri = 'http://localhost:3000';

    window.location.href = `${githubUrl}?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

 
  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      if (code) {
        try {
          const response = await axios.get(`http://localhost:8000/callback/${code}`);
          setUserData(response.data); 
          localStorage.setItem("social", response.data.email)
          localStorage.setItem("username", response.data.login)
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Handle error state or display error message
        }
      }
    };
  
    fetchData();
  }, []);
  
  const userIn = () => {
    if(localStorage.getItem("social")!== null){
      setRenderLogin(false);
    }
  }
  const handleCallBackResponse = (response) => {
    const userobject = jwt_decode(response.credential)

    localStorage.setItem("social", userobject.email)
    localStorage.setItem('username', userobject.given_name);
    document.getElementById("signInDiv").hidden = true
    userIn()
  }
  useEffect(() => {
    const showGoogle = () => {
      if (!userData){ 
        //Global google
        window.google.accounts.id.initialize({
        client_id: "403926179750-m9f02ftrqf07jif6hevn2n8fgkd7v299.apps.googleusercontent.com",
        callback: handleCallBackResponse

        })
        setTimeout(() => {
          window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
          );
        }, 300)
      }  
    }
    setTimeout(() => {
      showGoogle()
    }, 200) 
    
  },[])
  

  return (
    <div>
      <div id= "signInDiv">  </div>
      <div className='githubContainer' onClick={handleLogin}>
        <img src={githubLogo} className='githubLogo'/> 
        <div> Continue with GitHub</div>
      </div> 
    </div>
  );
};

export default Oauth;

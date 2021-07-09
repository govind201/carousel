import React from 'react';
import { authUrl } from '../../utils/credentials';
import './Login.css';

const Login = () => {
  return (
    <div  className="main">
      <div> Carousal</div>
      <a href={authUrl}>LOIGN WITH SPOTIFY</a>
    </div>
      
  )
}

export default Login

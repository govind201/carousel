import React from 'react';
import { authUrl } from '../../utils/credentials';
import './Login.css';
export default function Login() {
  return (
    <div  className="main">
      <div> Carousal</div>
      <a href={authUrl}>LOIGN WITH SPOTIFY</a>
    </div>
  );
}

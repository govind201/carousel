import React from 'react';
import './App.css';
import Recommend from './components/modules/Recommend';

import Login from './components/pages/Login';
import { getTokenFromResponse } from './utils/credentials';
// import spotifyApi from 'spotify-web-api-js';

function App() {

  const [token, setToken] = React.useState('');
  const [user, setUser] = React.useState({
    user: ''
  });
  React.useEffect(() => {
    let hash = getTokenFromResponse();
    window.location.hash = '';
    let tokenFromUrl = hash.access_token;
    if (!tokenFromUrl) return console.log('err NO TOKEN FOUND');
    setToken(tokenFromUrl);
    localStorage.setItem('token', token);
    console.log(token);
    return () => {
      localStorage.removeItem(token);
    };
  }, [token]);
  React.useEffect(()=> {
    if(!token) 
    return null;
       fetch('https://api.spotify.com/v1/me', 
    {headers: {'Authorization': 'Bearer ' + token}
    }).then((response) => 
      response.json()
     ).then((data) => (setUser({  user: data.display_name,...data})))
     .catch(error => console.log(error))
  },[token])
  console.log(user)
  return (
    <div>
      {!token && <Login />}
      {token && (
        <div>
          <h1>Welcome to carousel, {token} , {user.user}</h1>
          <Recommend token={token} />
        </div>
      )}
    </div>
  );
}

export default App;

// <SearchTracks
//   token={token}
// />

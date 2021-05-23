import React from 'react';
import './App.css';
import Recommend from './components/modules/Recommend';

import Login from './components/pages/Login';
import { getTokenFromResponse } from './utils/credentials';
// import spotifyApi from 'spotify-web-api-js';
// import SearchTracks from './components/modules/SearchTracks';
// const spotify = new spotifyapi();

function App() {
  //states for searching tracks with genre and playlist
  // const [topTracksShortTerm, setTopTracksShortTerm] = React.useState([]);
  // const [topTracksLongTerm, setTopTracksLongTerm] = React.useState([]);
  // const [topTracksMediumTerm, setTopTracksMediumTerm] = React.useState([]);

  // const [userData, setUserData] = React.useState({ name: '' });

  const [token, setToken] = React.useState('');
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
  return (
    <div>
      {!token && <Login />}
      {token && (
        <div>
          <h1>Welcome to carousel, {token}</h1>
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

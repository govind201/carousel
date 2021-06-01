import React from 'react';
import './App.css';
import Login from './components/pages/Login';
import AudioFeatures from './utils/AudioFeautures';
import { getTokenFromResponse } from './utils/credentials';

function App() {

  const [token, setToken] = React.useState('');
  const [user, setUser] = React.useState({
    user: '',
    userId: ''
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
     ).then((data) => {
       console.log("Data from me in app.js", data)
      setUser({ userId: data.id, user: data.display_name,...data}) 
      
     } )
     .catch(error => console.log(error))
  },[token])
  console.log(user)
  return (
    <div>
      {!token && <Login />}
      {token && user.userId && (
        <div>
          <h1>Welcome to carousel, {token} , {user.userId}</h1>
          <AudioFeatures token={token} userId = {user.userId} />
        </div>
      )}
    </div>
  );
}

export default App;

// <SearchTracks
//   token={token}
// />

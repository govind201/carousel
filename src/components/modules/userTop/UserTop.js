import React from 'react';
import Login from '../../pages/Login';

const UserTop = ({ token, topArtists, topTracks}) => {

 console.log("topArtists array in UserTop.js", topArtists, "topTracks in userTop", topTracks)
  return (
    <div>
      {!token  &&   <Login />   }
      <p> user top Tracks</p>
      <ol>
        {topArtists.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>

      <ol>
        {topTracks.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserTop; 

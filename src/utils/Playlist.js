import React from "react";
import './playlist.css'
// import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";


const Playlist = ({name, artist, photo, photoAlt}) => {
    return (
      <div className="container">
      <div  className="comp">
        
              <img src={photo} alt={photoAlt} className="photo"/>
            
                <h2 className="track">{name}</h2>
              
                <h3 className="artist">{artist}</h3>
              
      </div>
      </div>
    );
}

export default Playlist;
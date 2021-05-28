import React from "react";
import { Component } from "react";
// import "./Playlist.css";
// import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";


class Playlist extends Component {
  render() {
    return (
      <div className="container">
      <div style={{ color: "white" }} className="comp">
        
              <img src={this.props.photo} alt={this.props.photoAlt} className="photo"/>
            
                <h3 className="track">{this.props.name}</h3>
              
                <h3 className="artist">{this.props.artist}</h3>
              
      </div>
      </div>
    );
  }
}

export default Playlist;
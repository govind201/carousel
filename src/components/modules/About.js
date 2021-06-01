import React from "react";
import Emoji from "react-emoji-render";
import './aboutPage.css'
//<Emoji text=":emoji:" />


const  About = () => {

      return (
        <div className="about">
          <h1 className="aboutTitle"><Emoji text=":sparkles:" /> all about Moodie: <Emoji text=":sparkles:" /></h1>
          
          <p id="moodieTop"> Moodie was created using React.js and the Spotify API. We pull your top 50 tracks
              from your listening history and analyze the various audio features that Spotify provides each track.
              Each track has attributes like a danceability score, acousticness level, and tempo. Using these values,
              we try to categorize your music! 
          </p>
          <br />
          <br/>
          <p className="moodieLinks" >made with <Emoji text=":heart:" /> by 
                <a style={{color:"#92D3FF"}} href="https://www.linkedin.com/in/govind-/" target = "_blank" rel = "noopener noreferrer"> Muthu </a>
          </p>
        </div>
      );
    }
  
  export default About;
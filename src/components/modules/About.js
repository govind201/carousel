import React from "react";
import Emoji from "react-emoji-render";
import './aboutPage.css'
//<Emoji text=":emoji:" />


const  About = () => {

      return (
        <div className="about">
          <h1 className="aboutTitle"><Emoji text=":sparkles:" /> all about Moodie: <Emoji text=":sparkles:" /></h1>
          <br />
          <br/>
          <p className="moodieLinks" >made with <Emoji text=":heart:" /> by 
                <a style={{color:"#92D3FF"}} href="https://www.linkedin.com/in/govind-/" target = "_blank" rel = "noopener noreferrer"> Muthu </a>
          </p>
        </div>
      );
    }
  
  export default About;
import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Playlist from "./Playlist.js";
import queryString from "query-string";
import Emoji from "react-emoji-render";
import "./Filters.css"



const FiltersDrop = (props) => {
  const [loggedInQuery, setLoggedInQuery] = useState("");
  
  const [serverData, setServerData] = useState(
    {
      user: "",
    });

  //states for ids
  //track ids for user's top songs
  const [serverDataTopSongsLT, setServerDataTopSongsLT] = useState([]);
  const [serverDataTopSongsMT, setServerDataTopSongsMT] = useState([]);
  const [serverDataTopSongsST, setServerDataTopSongsST] = useState([]);


  //track info like id, acousticness, tempo, etc
  const [tracksInfoLT, setTracksInfoLT] = useState([]);
  const [tracksInfoMT, setTracksInfoMT] = useState([]);
  const [tracksInfoST, setTracksInfoST] = useState([]);

    //filtered ids based on mood picked
  const [filteredIDArr, setFilteredIDArr] = useState([]);

  //return song name based on filtered array
  const [topSongsArr, setTopSongsArr] = useState([]);

  const [dropdownOpenMood, setOpenMood] = useState(false);
  const [Mood, setMood] = useState("");

  const [dropdownOpenView, setOpenView] = useState(false);
  const [viewNum, setView] = useState("All Time");




  //LOG IN 

  function logIn(){
    const parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;
    setLoggedInQuery(access_token);
    if (!access_token){
      console.log("err")
      return;
    }
  }

//GET TRACK IDS IN ARRAY
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me', 
    {headers: {'Authorization': 'Bearer ' + loggedInQuery}
    }).then((response) => 
      response.json()
     ).then((data) => (setServerData({...serverData, user: data.display_name})))
     .catch(error => console.log(error))
    

    fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', 
    {headers: {'Authorization': 'Bearer ' + loggedInQuery}
    }).then((response) => response.json())
      .then((data) => setServerDataTopSongsLT(data.items.map(item => item.id)))
      .catch(error => console.log(error))

      fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', 
    {headers: {'Authorization': 'Bearer ' + loggedInQuery}
    }).then((response) => response.json())
      .then((data) => setServerDataTopSongsMT(data.items.map(item => item.id)))
      .catch(error => console.log(error))

      fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', 
    {headers: {'Authorization': 'Bearer ' + loggedInQuery}
    }).then((response) => response.json())
      .then((data) => setServerDataTopSongsST(data.items.map(item => item.id)))
      .catch(error => console.log(error)) 
    
  }, [loggedInQuery]);





//LONGTERM DATA: track info
useEffect(() => {
  
  let arrLink = serverDataTopSongsLT.reduce((total, init) => (total + ","+ init) , "");
  arrLink = arrLink.slice(1,);
  fetch(`https://api.spotify.com/v1/audio-features?ids=${arrLink}`, 
        {headers: {'Authorization': 'Bearer ' + loggedInQuery}
        }).then((response) => response.json())
         .then((data) => 
         setTracksInfoLT( ...tracksInfoLT,
         (data.audio_features.map(item => (
                     {
                    id: item.id,
                    acousticness: item.acousticness,
                    danceability: item.danceability,
                    energy: item.energy,
                    instrumentalness: item.instrumentalness,
                    liveness: item.liveness,
                    loudness: item.loudness,
                    speechiness: item.speechiness,
                    valence: item.valence,
                    tempo: item.tempo
                     })
                     ))
                    ))
        
                    .catch(error => console.log(error))  
  }, [serverDataTopSongsLT]);    
 // console.log(tracksInfoLT); 

//MediumTERM DATA: track info
useEffect(() => {
  let arrLink = serverDataTopSongsMT.reduce((total, init) => (total + ","+ init) , "");
  arrLink = arrLink.slice(1,);
  fetch(`https://api.spotify.com/v1/audio-features?ids=${arrLink}`, 
        {headers: {'Authorization': 'Bearer ' + loggedInQuery}
        }).then((response) => response.json())
         .then((data) => 
         setTracksInfoMT( ...tracksInfoLT,
         (data.audio_features.map(item => (
                     {
                    id: item.id,
                    acousticness: item.acousticness,
                    danceability: item.danceability,
                    energy: item.energy,
                    instrumentalness: item.instrumentalness,
                    liveness: item.liveness,
                    loudness: item.loudness,
                    speechiness: item.speechiness,
                    valence: item.valence,
                    tempo: item.tempo
                     })
                     ))
                    ))
        
                    .catch(error => console.log(error))  
  }, [serverDataTopSongsMT]);    
 // console.log(tracksInfoMT); 


//ShortTERM DATA: track info
useEffect(() => {
  
  let arrLink = serverDataTopSongsST.reduce((total, init) => (total + ","+ init) , "");
  arrLink = arrLink.slice(1,);
  fetch(`https://api.spotify.com/v1/audio-features?ids=${arrLink}`, 
        {headers: {'Authorization': 'Bearer ' + loggedInQuery}
        }).then((response) => response.json())
         .then((data) => 
         setTracksInfoST( ...tracksInfoLT,
         (data.audio_features.map(item => (
                     {
                    id: item.id,
                    acousticness: item.acousticness,
                    danceability: item.danceability,
                    energy: item.energy,
                    instrumentalness: item.instrumentalness,
                    liveness: item.liveness,
                    loudness: item.loudness,
                    speechiness: item.speechiness,
                    valence: item.valence,
                    tempo: item.tempo
                     })
                     ))
                    ))
        
                    .catch(error => console.log(error))  
  }, [serverDataTopSongsST]);    
 // console.log(tracksInfoST); 
  


useEffect(() => {
  //take in an array of filtered IDs and return the image, track name, artist
    if (filteredIDArr.length === 0){
      console.log("empty");
      setTopSongsArr([])
      return;
    }
    let arrLink = filteredIDArr.reduce((total, init) => (total + ","+ init) , "");
    arrLink = arrLink.slice(1,);
    fetch(`https://api.spotify.com/v1/tracks?ids=${arrLink}`, 
        {headers: {'Authorization': 'Bearer ' + loggedInQuery}
        }).then((response) => response.json())
         .then((data) => 
         setTopSongsArr(
         (data.tracks.map(item => (
                     {
                    name: item.name,
                    artist: item.album.artists[0].name,
                    photo: item.album.images[2].url,
                     })
                     ))
                    ))
        
                    .catch(error => console.log(error))
    
    
  
}, [filteredIDArr]);    
//console.log(topSongsArr); 


//FUNCTIONS TO FILTER MOODS
//classify audio features
function returnRange(val) {
  if (val > 0 && val <= 0.50) {
    return "low";
  } else {
    return "high";
  }
}  

function select_tracks(track) {
  let danceability = returnRange(track.danceability);
  let energy = returnRange(track.energy);
  let acousticness = returnRange(track.acousticness);
  let instrumentalness = returnRange(track.instrumentalness);
  let speechiness = returnRange(track.speechiness);
  let valence = returnRange(track.valence);
  let tempo = track.tempo;

  
  if (
    energy === "low" &&
    acousticness === "high" &&
    tempo < 100 
  ){
    return "Chill";
   } 
  else if (
    acousticness === "high" 
  ) {
    return "Acoustic";
  } else if (
    energy === "high" &&
    valence !== "low" &&
    danceability !== "low"
  ) {
    return "Happy";
  } else if (
    energy === "low"
  ) {
    return "Feelz";
  } else if (
    danceability !== "low" &&
    tempo > 100 &&
    energy !== "low"
  ) {
      return "Party";
  }
  else {
      return "none";
  }
  
}

//set filtered array based on mood chosen
 useEffect(() => {
  if (viewNum === "All Time"){
    setFilteredIDArr(
      tracksInfoLT.filter((e) => (Mood === "All Songs") ? e : (select_tracks(e)===Mood)).map(e => e.id)
    );
  }
  else if (viewNum === "6 Months"){
    setFilteredIDArr(
      tracksInfoMT.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
  else{
    setFilteredIDArr(
      tracksInfoST.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
   }, [Mood, viewNum]);

//console.log(filteredIDArr)






  
//toggle dropdown buttons
  const toggleMood = () => {
    setOpenMood(!dropdownOpenMood);
  };
  const toggleV = () => {
    setOpenView(!dropdownOpenView);
  };


  //set mood state based on what is clicked
  
  function clickedAcoustic() {
    setMood("Acoustic");
    
  }
  function clickedChill() {
    setMood("Chill");
    
  }
  function clickedHappy() {
    setMood("Happy");
    
  }
  function clickedSad() {
    setMood("Feelz");
    
  }
  function clickedParty() {
    setMood("Party");
    
  }
  function clickedAll() {
    setMood("All Songs");
    
  }


  //filter based on time frame
  function clickedST() {
    setView("30 Days");
    
  }
  function clickedMT() {
    setView("6 Months");
    
  }
  function clickedLT() {
    setView("All Time");
    
  }

  function checkTime(timeFrame){
    if (timeFrame === "30 Days"){
      return "ST";
    }
    if (timeFrame === "6 Months"){
      return "MT";
    }
    else {
      return "LT";
    }
  }

  return (
    <div className="filters">
      {(loggedInQuery !== "") ?
      <div>
            <div style={{textAlign: "center"}}>
              <ButtonDropdown
                isOpen={dropdownOpenMood}
                toggle={toggleMood}
                className="Mood--Btn"
              >
                <DropdownToggle
                  caret
                  style={{
                    backgroundColor: "#1DB954",
                    borderColor: "white",
                    color: "white",
                    borderRadius: "20px"
                  }}
                >
                  Mood: {Mood}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={clickedAcoustic}>Acoustic <Emoji text=":guitar:"/></DropdownItem>
                  <DropdownItem onClick={clickedChill}>Chill <Emoji text=":sun_behind_cloud:"/></DropdownItem>
                  <DropdownItem onClick={clickedHappy}>Happy <Emoji text=":upside_down:"/></DropdownItem>
                  <DropdownItem onClick={clickedSad}>Feelz <Emoji text=":disappointed_face:"/></DropdownItem>
                  <DropdownItem onClick={clickedParty}>Party <Emoji text=":dancer:"/></DropdownItem>
                  <DropdownItem onClick={clickedAll}>All Songs <Emoji text=":musical_notes:"/></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                isOpen={dropdownOpenView}
                toggle={toggleV}
                className="view--Btn"
              >
                <DropdownToggle
                  caret
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                    borderRadius: "20px"
                  }}
                >
                  View: {viewNum}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={clickedLT}>All Time <Emoji text=":hourglass_not_done:"/></DropdownItem>
                  <DropdownItem onClick={clickedMT}>6 Months <Emoji text=":calendar:"/></DropdownItem>
                  <DropdownItem onClick={clickedST}>30 Days <Emoji text=":clock1:"/></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
          
              <br />
              <br />
              
              {(Mood !== "") ?

                  <div>
                      {(topSongsArr.length !== 0) ? 
                          <div >
                              {topSongsArr.map((element) => {
                                return (
                                  <div key= {element.name}>
                                    <Playlist
                                      name={element.name}
                                      artist={element.artist}
                                      photo={element.photo}
                                      photoAlt="Album Cover"
                                    />
                                  </div>
                                );
                              })}
                          </div>
                      : <h3 style={{textAlign: "center"}}>there are no songs that match :(</h3>
                      }
                      </div>
                  : <h3 style={{textAlign: "center"}}>Pick a mood!</h3>
                  }
              </div>
            </div>
      
      

      : 
      (<div  style={{textAlign: "center"}}>
          <h1>If you haven't signed in, click <Button onClick={(e) => {
                                                  e.preventDefault();
                                                  window.location.href='http://moodie-backend.herokuapp.com/login';
                                                  }}>this</Button>
          </h1>
          <h2>Click <Button onClick={logIn}>here</Button> to start if you've signed in!</h2>
        <p>With Moodie, you can pick a mood and discover your top tracks that fit that vibe!</p>
      </div>)}
      

    </div>
  );
};

export default FiltersDrop;
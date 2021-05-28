import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Playlist from "./Playlist.js";
import Emoji from "react-emoji-render";
// import queryString from "query-string";
import UserTopFeatures from '../components/modules/UserTopFeatures';


const AudioFeatures = ({ token, topTracksShortTerm, topTracksMediumTerm, topTracksLongTerm }) => {
  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = React.useState(
    []
  );
  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = React.useState(
    []
  );
  const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = React.useState(
    []
  );

    const [filteredIDArr, setFilteredIDArr] = React.useState([]);

    const [topSongsArr, setTopSongsArr] = React.useState([]);

    const [dropdownOpenMood, setOpenMood] = React.useState(false);

  const [dropdownOpenView, setOpenView] = React.useState(false);
  const [Mood, setMood] = React.useState("");
  const [viewNum, setView] = React.useState("All Time");

//console.log(filteredIDArr)


  React.useEffect(() => {
    //short_term
    let shortTermArr = topTracksShortTerm.reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
    shortTermArr = shortTermArr.slice(1);
    console.log(shortTermArr);
    fetch(`https://api.spotify.com/v1/audio-features?ids=${shortTermArr}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
       console.log(data)
        return setAudioFeaturesShortTerm(
          ...audioFeaturesShortTerm,
          data.audio_features.map((item) => ({
            id: item.id,
            acousticness: item.acousticness,
            danceability: item.danceability,
            energy: item.energy,
            instrumentalness: item.instrumentalness,
            liveness: item.liveness,
            loudness: item.loudness,
            speechiness: item.speechiness,
            valence: item.valence,
            tempo: item.tempo,
          }))
        ) }
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [audioFeaturesShortTerm, token, topTracksShortTerm]);

  //for medium Term info of tracks
  React.useEffect(() => {
    let mediumTermArr = topTracksMediumTerm.reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
    mediumTermArr = mediumTermArr.slice(1);
    fetch(`https://api.spotify.com/v1/audio-features?ids=${mediumTermArr}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setAudioFeaturesMediumTerm(
          ...audioFeaturesMediumTerm,
          data.audio_features.map((item) => ({
            id: item.id,
            acousticness: item.acousticness,
            danceability: item.danceability,
            energy: item.energy,
            instrumentalness: item.instrumentalness,
            liveness: item.liveness,
            loudness: item.loudness,
            speechiness: item.speechiness,
            valence: item.valence,
            tempo: item.tempo,
          }))
        )
      )
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [audioFeaturesMediumTerm, token, topTracksMediumTerm]);

  React.useEffect(() => {
    let longTermArr = topTracksLongTerm.reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
   longTermArr = longTermArr.slice(1);
    fetch(`https://api.spotify.com/v1/audio-features?ids=${longTermArr}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) =>  
        setAudioFeaturesLongTerm(
          ...audioFeaturesLongTerm,
          data.audio_features.map((item) => ({
            id: item.id,
            acousticness: item.acousticness,
            danceability: item.danceability,
            energy: item.energy,
            instrumentalness: item.instrumentalness,
            liveness: item.liveness,
            loudness: item.loudness,
            speechiness: item.speechiness,
            valence: item.valence,
            tempo: item.tempo,
          }))
        )
      )
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [audioFeaturesLongTerm, token, topTracksLongTerm, topTracksMediumTerm]);


    console.log("filteredIdarr in audioFeatures",filteredIDArr)
React.useEffect(() => {
  //take in an array of filtered IDs and return the image, track name, artist
    if (filteredIDArr.length === 0 || filteredIDArr){
      console.log("empty");
      setTopSongsArr([])
      return;
    }
    let arrLink = filteredIDArr.reduce((total, init) => (total + ","+ init) , "");
    arrLink = arrLink.slice(1,);
    console.log("arrlink in audioFeatures",arrLink)
    fetch(`https://api.spotify.com/v1/tracks?ids=${arrLink}`, 
        {headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => response.json())
         .then((data) => {
              console.log("From data in audiofeatures in util",data)
         return setTopSongsArr(
         (data.tracks.map(item => (
                     {
                    name: item.name,
                    artist: item.album.artists[0].name,
                    photo: item.album.images[2].url,
                     })
                     ))
                    )}
                    )
        
                    .catch(error => console.log(error))
    
    
  
}, [filteredIDArr,token]);    
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

const  select_tracks = React.useCallback((track) => {
  let danceability = returnRange(track.danceability);
  let energy = returnRange(track.energy);
  let acousticness = returnRange(track.acousticness);
  // let instrumentalness = returnRange(track.instrumentalness);
  // let speechiness = returnRange(track.speechiness);
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
  
},[]);

//set filtered array based on mood chosen
 React.useEffect(() => {
  if (viewNum === "All Time"){
    setFilteredIDArr(
      topTracksShortTerm.filter((e) => (Mood === "All Songs") ? e : (select_tracks(e)===Mood)).map(e => e.id)
    );
  }
  else if (viewNum === "6 Months"){
    setFilteredIDArr(
      topTracksMediumTerm.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
  else{
    setFilteredIDArr(
      topTracksLongTerm.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps

   }, [Mood, viewNum, topTracksMediumTerm, topTracksLongTerm, select_tracks, topTracksShortTerm ]);

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

  //  const checkTime = (timeFrame) => {
  //   if (timeFrame === "30 Days"){
  //     return "ST";
  //   }
  //   if (timeFrame === "6 Months"){
  //     return "MT";
  //   }
  //   else {
  //     return "LT";
  //   }
  // }
  console.log("audioFeaturesShortTerm",audioFeaturesShortTerm);
  console.log("audioFeaturesMediumTerm",audioFeaturesMediumTerm);
  console.log("audioFeaturesLongTerm",audioFeaturesLongTerm)


  return (
    <div>
      

      <UserTopFeatures
        audioFeaturesMediumTerm={audioFeaturesMediumTerm}
        audioFeaturesShortTerm={audioFeaturesShortTerm}
      />

        {(token !== "") ?
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
          {/* <h1>If you haven't signed in, click <Button onClick={(e) => {
                                                  e.preventDefault();
                                                  window.location.href='http://moodie-backend.herokuapp.com/login';
                                                  }}>this</Button>
          </h1> */}
          <h2>Click <Button >here</Button> to start if you've signed in!</h2>
        <p>With Moodie, you can pick a mood and discover your top tracks that fit that vibe!</p>
      </div>)}
    </div>
  );
};

export default AudioFeatures;

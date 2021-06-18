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
import useIsMounted from './useIsMounted.js';
import UserTopFeatures from '../components/modules/UserTopFeatures.js';
// import UserTopFeaturges from '../components/modules/UserTopFeatures';


const topTracksReducer = (state, action) => {
  switch (action.type) {
    case 'medium_term':
      return {
        ...state,
        shortTerm: [action.val.map((item) => item.id)],
      };

    case 'short_term':
      return {
        ...state,
        mediumTerm: [action.val.map((item) => item.id)],
      };
      case 'long_term':
        return {
          ...state,
          longTerm: [action.val.map((item => item.id))]
        }

    default:
      return state;
  }
};


const AudioFeatures = ({ token, userId}) => {

    const [filteredIDArr, setFilteredIDArr] = React.useState([]);

    const [topSongsArr, setTopSongsArr] = React.useState([]);

    const [dropdownOpenMood, setOpenMood] = React.useState(false);

  const [dropdownOpenView, setOpenView] = React.useState(false);
  const [Mood, setMood] = React.useState("");
  const [viewNum, setView] = React.useState("All Time");


  const [topTracks, topTracksDispatch] = React.useReducer(topTracksReducer, {
    shortTerm: [],
    mediumTerm: [],
    longTerm: []
  });
  
  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = React.useState(
    []
  );  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = React.useState(
    []
  ); const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = React.useState(
    []
  );
  // const [tracksLoaded, setTracksLoaded] = React.useState(false)
  const [trackInfoLoaded, setTrackInfoLoaded] = React.useState(false)
  const isMounted = useIsMounted();


  //Effect for topTracks
  React.useEffect(() => {
    if(topTracks.longTerm.length  === 1 && topTracks.mediumTerm.length === 1  && topTracks.shortTerm.length === 1 ) {
      return;
    }
    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted())
          return topTracksDispatch({ type: 'short_term', val: data.items });
      })
      .catch((error) => console.log(error));
    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted())
          return topTracksDispatch({ type: 'medium_term', val: data.items });
      })
      .catch((error) => console.log(error));

    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted())
          return topTracksDispatch({ type: 'long_term', val: data.items });
      })
      .catch((error) => console.log(error));
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);



//TopTacks Features: shortterm
  React.useEffect(() => {
    if(audioFeaturesShortTerm.length === 50)
       return;
    let shortTermArr = topTracks.shortTerm.reduce(
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
      .then((data) =>  { 
     return    isMounted() ?
         setAudioFeaturesShortTerm(
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
          }))): data }
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topTracks.shortTerm]);

  //for medium Term info of tracks
  React.useEffect(() => {
    if(audioFeaturesMediumTerm.length === 50)
     return;
    let mediumTermArr = topTracks.mediumTerm.reduce(
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
      .then((data) => {
       console.log("data audio features in audiofeatures fn", data);
      return    isMounted() ?
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
        ):data }
      )
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ topTracks.mediumTerm]);

  React.useEffect(() => {
     if(audioFeaturesLongTerm.length === 50)
        return;

    let longTermArr = topTracks.longTerm.reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
   longTermArr = longTermArr.slice(1);
   console.log("longTermArr", longTermArr);
    fetch(`https://api.spotify.com/v1/audio-features?ids=${longTermArr}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) =>  {
       console.log("data audio features in audiofeatures fn", data);
      return  isMounted() ?
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
        ) : data
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topTracks.longTerm]);


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
    
    
  
// eslint-disable-next-line react-hooks/exhaustive-deps
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
const  select_tracks = (track)  =>{
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
  
}
if(filteredIDArr.length > 1)
console.log(filteredIDArr)

//set filtered array based on mood chosen
 React.useEffect(() => {
   if(!trackInfoLoaded)
      return;
  if (viewNum === "All Time"){
    setFilteredIDArr(
      topTracks.shortTerm.filter((e) => (Mood === "All Songs") ? e : (select_tracks(e)===Mood)).map(e => e.id)
    );
  }
  else if (viewNum === "6 Months"){
    setFilteredIDArr(
      topTracks.mediumTerm.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
  else{
    setFilteredIDArr(
      topTracks.longTerm.filter((e) => (Mood === "All Songs") ? e : select_tracks(e)===Mood).map(e => e.id)
    );
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [Mood, viewNum]);

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
  console.log("AudioFeatures.js called");

  //Effects to check if data loaded
  React.useEffect(()=>{
    if(audioFeaturesLongTerm.length === 50 && audioFeaturesMediumTerm.length === 50 && audioFeaturesShortTerm.length === 50)
        setTrackInfoLoaded(true);
  }, [audioFeaturesLongTerm.length, audioFeaturesMediumTerm.length, audioFeaturesShortTerm.length])

  React.useEffect(()=>{
    if(topTracks.longTerm.length  === 1 && topTracks.mediumTerm.length === 1  && topTracks.shortTerm.length === 1 ) {
      //  setTracksLoaded(true)
    }
       console.log("useEffect for data loaded called",  topTracks)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ topTracks.longTerm.length, topTracks.mediumTerm.length, topTracks.shortTerm.length])
  
  return (
    <div>
        { token && 
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
                    backgroundColor: "#1DB954",
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
        }

         {token &&  (
         <div> 
      <Playlist userId = {userId} token={token} topTracksShortTerm = {topTracks.shortTerm}/>
      <UserTopFeatures  audioFeaturesShortTerm = {audioFeaturesShortTerm} audioFeaturesMediumTerm = {audioFeaturesMediumTerm}/>
      </div>
         ) 
          }
          <h2>Click <Button >here</Button> to start if you've signed in!</h2>
      </div>  
  );
};

export default AudioFeatures;

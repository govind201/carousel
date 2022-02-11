import React, { useEffect,  } from 'react';
import Login from '../components/pages/Login.jsx';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Playlist from "./Playlist.js";
import Emoji from "react-emoji-render";
import useIsMounted from './useIsMounted.js';
import CreatePlaylist from '../components/modules/userTop/CreatePlaylist.js';
import './audioFeatures.css';
import useFetchAll from './useFetchAll.js';


 const short_term = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term';
 const medium_term = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term';
 const long_term = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term';
 const urls = [short_term, medium_term, long_term];

const AudioFeatures = ({ token, userId}) => {

    const [filteredIDArr, setFilteredIDArr] = React.useState([]);

    const [currentMoodSongs, setCurrentMoodSongs] = React.useState([]);
    const [isMoodSongsLoaded, setIsMoodSongsLoaded] = React.useState(false); 

    const [dropdownOpenMood, setOpenMood] = React.useState(false);

  const [dropdownOpenView, setOpenView] = React.useState(false);
  const [Mood, setMood] = React.useState("");
  const [viewNum, setView] = React.useState("All Time");

  
  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = React.useState(
    []
  );  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = React.useState(
    []
  ); const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = React.useState(
    []
  );
  const [trackInfoLoaded, setTrackInfoLoaded] = React.useState(false)
  const isMounted = useIsMounted();

  // 
  const   {shortTerm , mediumTerm, longTerm , loading}  = useFetchAll({urls: urls, token: token});
 
  
  React.useEffect(() => {
    // if(audioFeaturesShortTerm.length === 50  ||   loading) {
    //    console.log("still loading tracks or tracks not loaded", loading, shortTerm)
    //    console.log(audioFeaturesShortTerm);
    //    return;

    // }
    let  shortTermArr =  shortTerm.map(item => item.id).reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
    shortTermArr = shortTermArr.slice(1);
    fetch(`https://api.spotify.com/v1/audio-features?ids=${shortTermArr}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) =>  { 
        console.log(data);
     return    isMounted() ?
         setAudioFeaturesShortTerm(
          data.audio_features.map((item) => ({
            id: item.id,
            duration_ms: item.duration_ms,
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
      
  
  }, [isMounted, shortTerm, token]);

  React.useEffect(() => {
    let mediumTermArr =  mediumTerm.map(item => item.id).reduce(
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
        console.log(data);
      return    isMounted() ?
         setAudioFeaturesMediumTerm(
          // ...audioFeaturesMediumTerm,
          data.audio_features.map((item) => ({
            id: item.id,
            duration_ms: item.duration_ms,
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
    
  }, [isMounted, loading, mediumTerm, token]);

  React.useEffect(() => {
    console.log("useEffect for audioFeatures longTerm called")
    if(audioFeaturesLongTerm.length === 50 || loading) {
       console.log("still loading tracks or tracks not loaded", loading, longTerm)
       console.log(audioFeaturesLongTerm);
     return;
    }
    let longTermArr = longTerm.map(item => item.id).reduce(
      (total, curr) => total + ',' + curr,
      ''
    );
    // let longTermArr = longTerm.reduce(
    //   (total, curr) => total + ',' + curr,
    //   ''
    // );
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
        console.log(data);
      return  isMounted() ?
       setAudioFeaturesLongTerm(
          ...audioFeaturesLongTerm,
          data.audio_features.map((item) => ({
            id: item.id,
            duration_ms: item.duration_ms,
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
  }, [isMounted, loading, token]);


    console.log("filteredIdarr in audioFeatures",filteredIDArr)

 React.useEffect(() => {
  //take in an array of filtered IDs and return the image, track name, artist
    if (filteredIDArr.length === 0 || !filteredIDArr){
      console.log("empty");
      setCurrentMoodSongs([])
      return;
    }
    setIsMoodSongsLoaded(false);
     console.log("filterredIdarr in useEffect for fetching top tracks for the current mood", filteredIDArr)
    let arrLink = filteredIDArr.map(item => item.id).reduce((total, init) => (total + ","+ init) , "");
     let arr = arrLink.slice(1,);
    console.log("arrlink in audioFeatures", arr)
    
    fetch(`https://api.spotify.com/v1/tracks?ids=${arr}`, 
        {headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => response.json())
         .then((data) => {
              console.log("From data in audiofeatures in util",data)
          setCurrentMoodSongs(
         (data.tracks.map(item => (
                     {
                    id: item.id,
                    name: item.name,
                    artist: item.album.artists[0].name,
                    photo: item.album.images[2].url,
                     })
                     ))
                    )
                  
           setIsMoodSongsLoaded(true);
                  }
                    )
                    .catch(error => console.log(error))
    
  
}, [filteredIDArr, token]);    


//FUNCTIONS TO FILTER MOODS
//classify audio features
function returnRange(val) {
  if (val > 0 && val <= 0.50) {
    return "low";
  } else {
    return "high";
  }
}  
//set filtered array based on mood chosen
 React.useEffect(() => {

const  select_tracks = (track)  =>{
  let danceability = returnRange(track.danceability);
  let energy = returnRange(track.energy);
  let acousticness = returnRange(track.acousticness);
  // let instrumentalness = returnRange(track.instrumentalness);
  // let speechiness = returnRange(track.speechiness);
  let valence = returnRange(track.valence);
  let tempo = returnRange( track.tempo);

  
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
  
   if(!trackInfoLoaded || loading) {
      console.log("TracksInfo not loaded yet or loading tracks");
      return;
   }
   const filterSongs = (topSongs) => {
     let filterSongs = topSongs.filter((item)=>{

       if(Mood === 'All Songs') return true;
       
           return (select_tracks(item) === Mood)? true: false
       
     })
    let filterSongsArr =  filterSongs.map(item => item.id);
    return filterSongsArr;
   }


   console.log("Data loaded and useEffect for populating filtered id arr called")
  if (viewNum === "All Time"){
    setFilteredIDArr(
          filterSongs(audioFeaturesLongTerm)
    );
  }
  else if (viewNum === "6 Months"){
    setFilteredIDArr(
      audioFeaturesMediumTerm
    );
  }
  else{
    setFilteredIDArr(
      audioFeaturesShortTerm
    );
  }

   }, [Mood, audioFeaturesLongTerm, audioFeaturesMediumTerm, audioFeaturesShortTerm, loading, trackInfoLoaded, viewNum]);




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


  //Effects to check if data loaded
  React.useEffect(()=>{
    if(audioFeaturesLongTerm.length === 50 && audioFeaturesMediumTerm.length === 50 && audioFeaturesShortTerm.length === 50)
        setTrackInfoLoaded(true);
      console.log("Track info loaded", trackInfoLoaded)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFeaturesLongTerm.length, audioFeaturesMediumTerm.length, audioFeaturesShortTerm.length])

  useEffect(()=>{
  console.log("To check topsongs", shortTerm, longTerm, mediumTerm)
  },[shortTerm, longTerm, mediumTerm]);
 
  return (
    <div>
      {!token && <Login/>}
        {  token && 
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
              
              {(Mood && isMoodSongsLoaded ) ?

                  <div >
                      
                      
                      {(currentMoodSongs.length !== 0) ? 
                          <div >
                              {currentMoodSongs.map((element) => {
                                return (
                                  <div  key= {element.id}  className='mood-songs-container'>
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
         {token  && !loading && trackInfoLoaded &&(
         <div> 
      <CreatePlaylist userId = {userId} token={token} topTracksShortTerm = {shortTerm} audioFeaturesShortTerm = {audioFeaturesShortTerm} audioFeaturesMediumTerm = {audioFeaturesMediumTerm} />
      </div>
         ) 
          }
              </div>
            </div>
        }

      </div>  
  );
};

export default AudioFeatures;

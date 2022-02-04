
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopGenre from './topGenre';
import SpotifyWebApi from 'spotify-web-api-js';
import TopFeatures from './TopFeatures';
import UserTop from './UserTop';
import Login from '../../pages/Login';
import Logo from '../../../utils/Logo';
import useFetch from "../../../utils/useFetch";
const spotifyApi = new SpotifyWebApi()
const  url = 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term';

const CreatePlaylist = ({ token, topTracksShortTerm, audioFeaturesShortTerm, audioFeaturesMediumTerm, userId }) => {

   const [topArtists, loading] = useFetch({url, token});

  const [topAudioFeatures, setTopAudioFeatures] = React.useState({
    isLoaded: false,
    acousticness: {},
    danceability: {},
    energy: {},
    instrumentalness: {},
    speechiness: {},
    valence: {},
    tempo: {},
  });

 const [recAudioFeatures, setRecAudioFeatures] = React.useState({
    isLoaded: false,
    acousticness: {},
    danceability: {},
    energy: {},
    instrumentalness: {},
    speechiness: {},
    valence: {},
    tempo: {},

 })

  const [favPlay, setFavPlay] = useState({
    favurl: '',
    favplayid: "",
    createdFav: false
  })

  const [recPlay, setRecPlay] = useState({
    recurl: "",
    recid: "",
    recURIs: [],
    createdRec: false,

  })

  React.useEffect(()=>{
         spotifyApi.setAccessToken(token);
         TopAudioFeaturesCalled();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  const getAverage = (nums) =>{
      return nums.reduce((a, b) => (a + b)) / nums.length;
  }


  const TopAudioFeaturesCalled = () => {
    let acousticness = [];
    let danceability = [];
    let energy = [];
    let instrumentalness = [];
    let speechiness = [];
    let valence = [];
    let tempo = [];
  
    for(let i = 0; i < 10; i++) {
      acousticness.push(audioFeaturesShortTerm[i].acousticness);
      danceability.push(audioFeaturesShortTerm[i].danceability);
      energy.push(audioFeaturesShortTerm[i].energy);
      instrumentalness.push(audioFeaturesShortTerm[i].instrumentalness);
      speechiness.push(audioFeaturesShortTerm[i].speechiness);
      valence.push(audioFeaturesShortTerm[i].valence);
      tempo.push(audioFeaturesShortTerm[i].tempo);
    }

    setRecAudioFeatures({
      acousticness:  Math.round(getAverage(acousticness) * 100) / 100,
      danceability: Math.round(getAverage(danceability) * 100) / 100,
      energy: Math.round(getAverage(energy) * 100) / 100,
      instrumentalness: Math.round(getAverage(instrumentalness) * 100) / 100, 
      speechiness: Math.round(getAverage(speechiness) * 100) / 100,
      valence: Math.round(getAverage(valence) * 100) / 100,
      tempo: Math.round(getAverage(tempo) * 100) / 100,
    })

    acousticness = [];
    danceability = [];
    energy = [];
    instrumentalness = [];
    speechiness = [];
    valence = [];
    tempo = [];
  
    for (let i = 0; i < audioFeaturesShortTerm.length; i++) {
      acousticness.push(audioFeaturesShortTerm[i].acousticness);
      danceability.push(audioFeaturesShortTerm[i].danceability);
      energy.push(audioFeaturesShortTerm[i].energy);
      instrumentalness.push(audioFeaturesShortTerm[i].instrumentalness);
      speechiness.push(audioFeaturesShortTerm[i].speechiness);
      valence.push(audioFeaturesShortTerm[i].valence);
      tempo.push(audioFeaturesShortTerm[i].tempo);
    }
    for (let i = 0; i < audioFeaturesMediumTerm.length; i++) {
      acousticness.push(audioFeaturesMediumTerm[i].acousticness);
      danceability.push(audioFeaturesMediumTerm[i].danceability);
      energy.push(audioFeaturesMediumTerm[i].energy);
      instrumentalness.push(audioFeaturesMediumTerm[i].instrumentalness);
      speechiness.push(audioFeaturesMediumTerm[i].speechiness);
      valence.push(audioFeaturesMediumTerm[i].valence);
      tempo.push(audioFeaturesMediumTerm[i].tempo);
    }

    setTopAudioFeatures({
      acousticness: {
        value: Math.round(getAverage(acousticness) * 100) / 100,
        desc:
          'acousticness is a measure from 0.0 to 1.0 of how acoustic your tracks are, where 1.0 is most acoustic and 0.0 is least acoustic.',
      },
      danceability: {
        value: Math.round(getAverage(danceability) * 100) / 100,
        desc:
          'Danceability is a measure from 0.0 to 1.0 of how suitable your tracks are for dancing, where 1.0 is most danceable and 0.0 is least danceable.',
      },
      energy: {
        value: Math.round(getAverage(energy) * 100) / 100,
        desc:
          'Energy is a measure from 0.0 to 1.0 that represents how intense your tracks are, where 1.0 is most energetic and 0.0 is least energetic. An high energy track will feel fast, loud, noisy, and have more dynamic range and general entropy.',
      },
      instrumentalness: {
        value: Math.round(getAverage(instrumentalness) * 1000) / 1000,
        desc:
          'Instrumentalness is a measure from 0.0 to 1.0 that predicts whether a track has no vocals, where tracks closer to 1.0 in instrumentalness are more likely to have no vocals and tracks closer to 0.0 have a lot of vocals, such as rap.',
      },
      speechiness: {
        value: Math.round(getAverage(speechiness) * 100) / 100,
        desc:
          'Speechiness is a measure from 0.0 to 1.0 that detects the presence of spoken words in a track, where tracks with a speechiness closer to 1.0 are more likely to have exclusively spoken words and tracks closer to 0.0 represent music and non-spoken words.',
      },
      valence: {
        value: Math.round(getAverage(valence) * 100) / 100,
        desc:
          'Valence is a measure from 0.0 to 1.0 that represents how positive your tracks are, where 1.0 is more positive and happy sounds and 0.0 is more negative and sad or angry sounds.',
      },
      tempo: {
        value: Math.round(getAverage(tempo)),
        desc:
          'Tempo is the overall estimated tempo of a track in beats per minute (BPM).',
      },
      isLoaded: true,
    });
  };


  function createFavPlaylist() {
    var today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var date = monthNames[today.getMonth()] + " " + today.getFullYear();
    const playlistName = `Your ${date} favourites`;
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({name:playlistName})
    }
    ).then(res => res.json()).then(jsonResponse => {
        console.log(jsonResponse);
        setFavPlay({
          favurl: jsonResponse.external_urls.spotify,
          favplayid: jsonResponse.id,
          createdFav: true

        })
    })
  }


   React.useEffect(()=>{
      if(!favPlay.favplayid) {
        console.log("favPlayid not available yet" )
        return;  
      }
    //getting URIs for the songs
    var songURIs = [topTracksShortTerm.length]
    for (var i = 0; i < topTracksShortTerm.length; i++) {
      songURIs[i] = topTracksShortTerm[i].uri
    };

    fetch("https://api.spotify.com/v1/playlists/"+ favPlay.favplayid+"/tracks", {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({"uris": songURIs})
    } )

   },[favPlay.favplayid, token, topTracksShortTerm])


  //Create Rec Playlistou
 function createRecPlaylist() {
  const playlistName = "You might like these by Carousel"
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({name:playlistName})
    }
    ).then(res => res.json()).then(jsonResponse => {
        console.log(jsonResponse);
        setRecPlay((currState) => ({
          ...currState,
          recurl: jsonResponse.external_urls.spotify,
           recid: jsonResponse.id,
        }))
    })
  }

   
  React.useEffect(()=>{
    if(loading) {
      console.log("IN get rec", topAudioFeatures);
      return;
    }
      //Use top 5 artists as seeds

    var len = 3;
    var  tracksSeed = [len];
    for (var i = 0; i < len; i++) {
      tracksSeed[i] =  topTracksShortTerm[i].id;
    };
    var artistsSeed = [2];

    for(let i = 0; i < 2; i++) {
      artistsSeed[i] = topArtists[i].id ;
    }
    var songURIs = [];
    //Grab Recommendations
     spotifyApi.getRecommendations({
      limit: 30,
      seed_tracks: tracksSeed,
      seed_artists: artistsSeed,
      // min_popularity: 10,
      max_popularity: 50,
      target_acousticness: recAudioFeatures.acousticness ,
      target_danceability: recAudioFeatures.danceability ,
      target_energy:recAudioFeatures.energy ,
      target_instrumentalness:recAudioFeatures.instrumentalness ,
      target_speechiness:recAudioFeatures.speechiness ,
      target_valence:recAudioFeatures.valence ,
    })
    .then ((data) => {
      var tracks = data.tracks;
      for (var i = 0; i < tracks.length; i++) {
        songURIs.push(tracks[i].uri);
      }
      setRecPlay((prevState) => ({
        ...prevState,
        recURIs: songURIs,
        createdRec: true,
      }));

    fetch("https://api.spotify.com/v1/playlists/"+ recPlay.recid+"/tracks", {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({"uris": songURIs })
    }
    ).then( (res ) => {
            console.log("created Rec Playlist");
            return res;
    }).catch(err => console.error(err));
    }).catch( (err) => console.error(err));
  


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recPlay.recid]
)

    const linkStyle= {
      margin: "50em 0 0 0",
      color: "#d9e254",
    };

    let favbutton =
      (<div >
          <button onClick={() => createFavPlaylist()} type="button" className="btn btn-lg btn-light"> Click to make a playlist of your favorites!</button>
      </div>);

    if (favPlay.createdFav) {
      favbutton = (
        <div >
          <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={favPlay.favurl}> Your playlist is here. </a>
        </div>
      )
    }

    //Rec Button Logic
    let recbutton =
      (<div >
          <button onClick={() => createRecPlaylist()} type="button" className="btn btn-light btn-lg margin"> Click to get rec's recommendations!</button>
      </div>);

    if (recPlay.createdRec) {
      recbutton = (
        <div >
          <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={recPlay.recurl}> Your playlist is here. </a>
        </div>
      )
    }


console.log("TopARtists", topArtists)
  return (
    <div>

       {!token && (
         <Login from = "createPlaylist.js" />
        )}
      
        {token && (
          <div>
            <Logo/>
            <div >
              <div >
                <span>1. Your Current Favorites</span>
              </div>
              <div > { !loading &&  topTracksShortTerm &&(

                  <UserTop token = {token } topTracks={topTracksShortTerm.slice(0, 12)} topArtists={topArtists.slice(0, 10)}/>
              )
                }
              </div>
            </div>
            <div  >
              {!loading && favbutton}
            </div>
            <div >
              <span>Carousel</span>
              <p > Find new music based on the average features of the music you already love.</p>
            </div>
            <div >
              {!loading && !topAudioFeatures.isLoading && recbutton}
            </div>
            Created by Govind Singh with React and love.
          </div>
        )}

      <button onClick={TopAudioFeaturesCalled}>Show audio Features</button>({' '}
      {!topAudioFeatures.isLoading && (
        <TopFeatures topAudioFeatures={topAudioFeatures} />
      )}
      ) {
   !loading && 
      <div>
  
      <ol>
        {topArtists.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>
      </div>
      }

        { !loading &&  <TopGenre topArtists={topArtists} />}  
    </div>
  );
};

export default CreatePlaylist; 


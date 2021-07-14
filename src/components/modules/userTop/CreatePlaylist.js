import React from 'react';
import * as $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import useIsMounted from '../../../utils/useIsMounted';
import TopGenre from './topGenre';
import SpotifyWebApi from 'spotify-web-api-js';
import TopFeatures from './TopFeatures';
import UserTop from './UserTop';
import Login from '../../pages/Login';
import Logo from '../../../utils/Logo';
const spotifyApi = new SpotifyWebApi()

const CreatePlaylist = ({ token, topTracksShortTerm, audioFeaturesShortTerm, audioFeaturesMediumTerm, userId }) => {
  const [topArtists, setTopArtists] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const isMounted = useIsMounted();

  const [topAudioFeatures, setTopAudioFeatures] = React.useState({
    isLoading: true,
    acousticness: {},
    danceability: {},
    energy: {},
    instrumentalness: {},
    speechiness: {},
    valence: {},
    tempo: {},
  });

 const [topArtistsLoaded, setTopArtistsLoaded] = React.useState(null);

  const [play, setPlay] = React.useState({
      favurl: "",
      favplayid: "",
      recURIs: [],
      recurl: "",
      recid: "",
      createdRec: false
  })

  React.useEffect(()=>{
         spotifyApi.setAccessToken(token);
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
      isLoading: false,
    });
  };
  React.useEffect(() => {
    if(topArtists.length >= 5 | topArtistsLoaded  | isLoaded) {
console.log("oop more thaaan 10 toARtists", topArtists);
    }
    setTopArtistsLoaded(false);
    fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term',
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          console.log("from topArtists in isMounted",data.items)
          return data.items.map((item) =>
            setTopArtists((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
                genres: item.genres,
              },
            ])
          );
        }
      setTopArtistsLoaded(true);
      }
      )
      .catch((err) => console.log(err));
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, token]);


  React.useEffect(()=> {
    if(topArtists.length >= 5 ) 
     setIsLoaded(true)
     console.log("useEffect for data loaded in topArtists", topArtists)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topArtists.length])

 async function  createFavPlaylist () {
    var today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var date = monthNames[today.getMonth()] + " " + today.getFullYear();
    
     $.ajax({
      url: "https://api.spotify.com/v1/users/"+userId+"/playlists",
      type: "POST",
      data: JSON.stringify({name: "Your " + date + " Favorites"}, {description: "Created with Carousel."}),
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: async play => {
        console.log("State of play inside createFavPlaylsit", play);
         setPlay((prevState) => ({
          ...prevState,
          favurl: play.external_urls.spotify,
          favplayid: play.id,
          createdFav: true,
        }));
       await  populateFavPlaylist();
      }
    });

  }
    function populateFavPlaylist() {
      if(!play.favplayid) {
        console.log("favPlayid not available yet", play)
        return;  
      }
    //getting URIs for the songs
    var songURIs = [topTracksShortTerm.length]
    for (var i = 0; i < topTracksShortTerm.length; i++) {
      songURIs[i] = topTracksShortTerm[i].uri
    };
     $.ajax({
      url: "https://api.spotify.com/v1/playlists/"+play.favplayid+"/tracks",
      type: "POST",
      data: JSON.stringify({"uris": songURIs}),
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
    });
  }

    //ADD SONGS TO REC Playlist
    function populateRecPlaylist(){
      if(!play.recid) {
        console.log("Play.recid not available yet")
        return;
      }
       $.ajax({
      url: "https://api.spotify.com/v1/playlists/"+play.recid+"/tracks",
      type: "POST",
      data: JSON.stringify({"uris": play.recURIs}),
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
    });
  }
  console.log(play, "this is display play in playlist");


    const getRecs = () => {
      if(!isLoaded && !topAudioFeatures.isLoading)  {
      console.log("in getRec", isLoaded, topAudioFeatures);
      return;
      }
    //Use top 5 artists as seeds
    var len = 5;
    var artistSeeds = [len];
    for (var i = 0; i < len; i++) {
      artistSeeds[i] = topArtists[i].id;
    };
    var songURIs = [];
    //Grab Recommendations
     spotifyApi.getRecommendations({
      limit: 30,
      seed_artists: artistSeeds,
      min_popularity: 10,
      max_popularity: 50,
      target_acousticness: topAudioFeatures.acousticness.value,
      target_danceability: topAudioFeatures.danceability.value,
      target_energy: topAudioFeatures.energy.value,
      target_instrumentalness: topAudioFeatures.instrumentalness.value,
      target_speechiness: topAudioFeatures.speechiness.value,
      target_valence: topAudioFeatures.valence.value,
    })
    .then ((data) => {
      var tracks = data.tracks;
      for (var i = 0; i < tracks.length; i++) {
        songURIs.push(tracks[i].uri);
      }
      setPlay((prevState) => ({
        ...prevState,
        recURIs: songURIs
      }));
      populateRecPlaylist();
    })
  }

  //Create Rec Playlist
 async  function createRecPlaylist() {
     $.ajax({
      url: "https://api.spotify.com/v1/users/"+userId+"/playlists",
      type: "POST",
      data: JSON.stringify({name: "you might like these BY Carousel"}, {description: "Created with Carousel."}),
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: async play => {
        setPlay((prevState) => ({
          ...prevState,
          recurl: play.external_urls.spotify,
          recid: play.id,
          createdRec: true
        }));
        
        await getRecs();
      }
    });

  }
   React.useEffect(()=> {
     if (!isLoaded && topArtists.length >= 5) {
               setIsLoaded(true)
    }
   },[isLoaded, topArtists.length])


    //Fav Playlist Logic
    const linkStyle= {
      margin: "50em 0 0 0",
      color: "#d9e254",
    };

    let favbutton =
      (<div >
          <button onClick={() => createFavPlaylist()} type="button" className="btn btn-lg btn-light"> Click to make a playlist of your favorites!</button>
      </div>);

    if (play.createdFav) {
      favbutton = (
        <div >
          <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={play.favurl}> Your playlist is here. </a>
        </div>
      )
    }

    //Rec Button Logic
    let recbutton =
      (<div >
          <button onClick={() => createRecPlaylist()} type="button" className="btn btn-light btn-lg margin"> Click to get rec's recommendations!</button>
      </div>);

    if (play.createdRec) {
      recbutton = (
        <div >
          <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={play.recurl}> Your playlist is here. </a>
        </div>
      )
    }


console.log("TopARtists", topArtists)
  return (
    <div>

       {!token && (
         <Login />
        )}
        {token && (
          <div >  
            PleasE wait while we get your Favourites
          </div>
        )}
        {token && (
          <div>
            <Logo/>
            <div >
              <div >
                <span>1. Your Current Favorites</span>
              </div>
              <div > { topArtistsLoaded &&  topTracksShortTerm &&(

                  <UserTop topTacks={topTracksShortTerm.slice(0, 10)} topArtists={topArtists.slice(0, 10)}/>
              )
                }
              </div>
            </div>
            <div  >
              {isLoaded && favbutton}
            </div>
            <div >
              <span>Carousel</span>
              <p > Find new music based on the average features of the music you already love.</p>
            </div>
            <div >
              {isLoaded && !topAudioFeatures.isLoading && recbutton}
            </div>
            Created by Govind Singh. Made using React and Spotify api 
          </div>
        )}

      <button onClick={TopAudioFeaturesCalled}>Show audio Features</button>({' '}
      {!topAudioFeatures.isLoading && (
        <TopFeatures topAudioFeatures={topAudioFeatures} />
      )}
      ) {
   isLoaded && 
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

        { topArtists &&  <TopGenre topArtists={topArtists} />}  
    </div>
  );
};
export default CreatePlaylist; 


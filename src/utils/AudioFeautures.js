import React from 'react';
import UserTopFeatures from '../components/modules/UserTopFeatures';
// import useIsMounted from '../utils/useIsMounted';

// const audioFeaturesReducer = (state, action) => {
//   switch (action.type) {
//     case 'short_term':
//       return {
//         ...state,
//         shortTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//           })),
//         ],
//       };

//     case 'medium_term':
//       return {
//         ...state,
//         mediumTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//           })),
//         ],
//       };
//     case 'long_term':
//       return {
//         ...state,
//         longTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//           })),
//         ],
//       };
//     default:
//       return state;
//   }
// };

const AudioFeatures = ({ token, topTracksShortTerm, topTracksMediumTerm }) => {
  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = React.useState(
    []
  );
  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = React.useState(
    []
  );

  // //array to store top tracks for a user
  // const [topTracks, setTopTracks] = React.useState([]);

  // const [timeRange, setTimeRange] = React.useState('all time');
  // const [mood, setMood] = React.useState('happy');

  // //Effect for audio-features
  // const isMounted = useIsMounted();
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
      .then((data) =>
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
          }))
        )
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, topTracksShortTerm]);

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
  }, [token, topTracksMediumTerm]);

  console.log(audioFeaturesShortTerm);
  console.log(audioFeaturesMediumTerm);
  return (
    <div>
      <div>from audioFeatures</div> (
      

      <UserTopFeatures
        audioFeaturesMediumTerm={audioFeaturesMediumTerm}
        audioFeaturesShortTerm={audioFeaturesShortTerm}
      />
      )
    </div>
  );
};

export default AudioFeatures;

//   const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = React.useState(
//     ''
//   );
//   const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = React.useState(
//     ''
//   );
//     const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = React.useState('');

// const audioFeaturesReducer = (state, action) => {
//   switch (action.type) {
//     case 'short_term':
//       return {
//         ...state,
//         shortTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//             valence: item.valence,
//             speechiness: item.speechiness,
//             loudness: item.loudness,
//             liveness: item.liveness,
//             instrumentalness: item.instrumentalness,
//             energy: item.energy,
//             danceability: item.danceability,
//             accousticness: item.accousticness,
//           })),
//         ],
//       };
//     case 'medium_term':
//       return {
//         ...state,
//         mediumTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//             valence: item.valence,
//             speechiness: item.speechiness,
//             loudness: item.loudness,
//             liveness: item.liveness,
//             instrumentalness: item.instrumentalness,
//             enery: item.energy,
//             danceability: item.danceability,
//             accousticness: item.accousticness,
//           })),
//         ],
//       };
//     case 'long_term':
//       return {
//         ...state,
//         longTerm: [
//           action.val.map((item) => ({
//             id: item.id,
//             tempo: item.tempo,
//             valence: item.valence,
//             speechiness: item.speechiness,
//             loudness: item.loudness,
//             liveness: item.liveness,
//             instrumentalness: item.instrumentalness,
//             enery: item.energy,
//             danceability: item.danceability,
//             accousticness: item.accousticness,
//           })),
//         ],
//       };
//     default:
//       return state;
//   }
// };

// const [audioFeatures, audioFeaturesDispatch] = React.useReducer(
//   audioFeaturesReducer,
//   {
//     shortTerm: [],
//     mediumTerm: [],
//     longTerm: [],
//   }
// );

// React.useEffect(() => {
//   let longTermArr = topTracksLongTerm.reduce(
//     (total, curr) => total + ',' + curr,
//     ''
//   );
//   longTermArr = longTermArr.slice(1);
//   fetch(`https://api.spotify.com/v1/audio-features?ids=${longTermArr}`, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//       'Content-type': 'application/json',
//     },
//   })
//     .then((res) => res.json())
//     .then((data) =>
//       setAudioFeaturesLongTerm(
//         ...audioFeaturesLongTerm,
//         data.audio_features.map((item) => ({
//           id: item.id,
//           acousticness: item.acousticness,
//           danceability: item.danceability,
//           energy: item.energy,
//           instrumentalness: item.instrumentalness,
//           liveness: item.liveness,
//           loudness: item.loudness,
//           speechiness: item.speechiness,
//           valence: item.valence,
//           tempo: item.tempo,
//         }))
//       )
//     )
//     .catch((err) => console.log(err));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [token, topTracksLongTerm]);

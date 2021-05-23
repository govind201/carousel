import React from 'react';
import AudioFeatures from '../../utils/AudioFeautures';
import TopArtist from './userTop/TopArtist';
import TopTracks from './userTop/TopTracks';
import useIsMounted from '../../utils/useIsMounted';

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

    default:
      return state;
  }
};
const Recommend = ({ token }) => {
  const [topTracks, topTracksDispatch] = React.useReducer(topTracksReducer, {
    shortTerm: [],
    mediumTerm: [],
  });

  const isMounted = useIsMounted();
  //Effect for topTracks
  React.useEffect(() => {
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
  }, [token, isMounted]);

  console.log(topTracks);

  return (
    <div className="get-rec">
      {topTracks.shortTerm.length && topTracks.mediumTerm.length && (
        <AudioFeatures
          token={token}
          topTracksShortTerm={topTracks.shortTerm}
          topTracksMediumTerm={topTracks.mediumTerm}
        />
      )}
      <TopArtist token={token} />
      <TopTracks token={token} />
    </div>
  );
};

export default Recommend;

// //Effect for audio-features
// React.useEffect(() => {
//   //short_term
//   let shortTermArr = topTracks.shortTerm.reduce(
//     (total, curr) => total + ',' + curr,
//     ''
//   );
//   shortTermArr = shortTermArr.slice(1);
//   console.log(shortTermArr);
//   fetch(` https://api.spotify.com/v1/audio-features/?ids=${shortTermArr}`, {
//     headers: { Authorization: 'Bearer' + token },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (IsMounted())
//         audioFeaturesDispatch({
//           type: 'short_term',
//           val: data.audio_features,
//         });
//     });
// }, [topTracks.shortTerm, IsMounted, token]);

// //FOR LONG TERM INFO OF tracks
// React.useEffect(() => {
//   let longTermArr = topTracks.longTerm.reduce(
//     (total, curr) => total + ',' + curr,
//     ''
//   );
//   longTermArr = longTermArr.slice(1);
//   fetch(`https://api.spotify.com/v1/audio-features/?ids=${longTermArr}`, {
//     headers: { Authorization: 'Bearer' + token },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (IsMounted())
//         audioFeaturesDispatch({
//           type: 'long_term',
//           val: data.audio_features,
//         });
//     })
//     .catch((err) => console.log(err));
// }, [topTracks.longTerm, IsMounted, token]);

// //for short Term info of tracks
// React.useEffect(() => {
//   let mediumTermArr = topTracks.mediumTerm.reduce(
//     (total, curr) => total + ',' + curr,
//     ''
//   );
//   mediumTermArr = mediumTermArr.slice(1);
//   fetch(`https://api.spotify.com/v1/audio-features/?ids=${mediumTermArr}`, {
//     headers: { Authorization: 'Bearer' + token },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (IsMounted())
//         audioFeaturesDispatch({
//           type: 'medium_term',
//           val: data.audio_features,
//         });
//     })
//     .catch((err) => console.log(err));
// }, [topTracks.mediumTerm, IsMounted, token]);

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

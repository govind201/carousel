// import react from 'react';

// const useAudioFeatures = (time = '', arr = [], token) => {
//   const [state, setState] = React.useState({
//     data: [],
//     loading: false,
//     error: false,
//   });
//   React.useEffect(() => {
//     let arrID = arr.reduce((total, curr) => total + ',' + curr, '');
//     fetch(`https://api.spotify.com/v1/audio-features/ids=${arrID}`, {
//       headers: { Authorization: 'Bearer' + token },
//     })
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: 'time', val: data.audio_features }))
//       .catch((err) => console.log(err));
//   }, [token, time, arr]);

//   return {
//     state.data,
//     state.loading,
//     state.error
//   }
// };

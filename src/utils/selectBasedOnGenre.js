
const getTrackGenre = (track) => {
  let danceability = (track.danceability);
//   let energy = (track.energy);
//   let acousticness = (track.acousticness);
//   let instrumentalness =(track.instrumentalness);
  let speechiness = (track.speechiness);
//   let valence = (track.valence);
  let tempo = track.tempo;
  let duration_ms = track.duration_ms

  if(speechiness >= 0.22) return "rap";
  else if(danceability < (-0.65)) return "rock";
  else if (tempo > 0.04) return "edm";
  else if(duration_ms >= 0.36) return "r&b";
  else if(danceability < 0.38) return 'pop';
  else if(danceability >= 0.38) return "latin";
  else return "none";
}
export default getTrackGenre;
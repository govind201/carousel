import React from 'react';
//Todo Accousicness.value is still not a number i.e NaN
export const TopFeatures = ({ topAudioFeatures }) => {
  return (
    <div>
      from top features in top
      <ol>
        <li>
          <div>
         <div> {topAudioFeatures.valence.value} </div>
        <div> {topAudioFeatures.valence.desc}</div>
          </div>
        </li>
        <li>{topAudioFeatures.acousticness.desc}</li>
        <li>{topAudioFeatures.energy.desc}</li>
        <li>{topAudioFeatures.energy.value}</li>
        <li>{topAudioFeatures.tempo.desc}</li>
        <li>{topAudioFeatures.tempo.value}</li>
        <li>{topAudioFeatures.speechiness.desc}</li>
        <li>{topAudioFeatures.speechiness.value}</li>
      </ol>
    </div>
  );
};

export default TopFeatures;

import React from 'react';

export const TopFeatures = ({ topAudioFeatures }) => {
  return (
    <div>
      from top features in top
      <ol>
        <li>{topAudioFeatures.valence.value}</li>
        <li>{topAudioFeatures.valence.desc}</li>
      </ol>
    </div>
  );
};

export default TopFeatures;

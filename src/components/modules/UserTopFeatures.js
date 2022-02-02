import React from 'react';
import TopFeatures from './userTop/TopFeatures';

const UserTopFeatures = ({
  audioFeaturesShortTerm,
  audioFeaturesMediumTerm,
}) => {
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
      acousticness.push(audioFeaturesShortTerm[i].Acousticness);
      danceability.push(audioFeaturesShortTerm[i].danceability);
      energy.push(audioFeaturesShortTerm[i].energy);
      instrumentalness.push(audioFeaturesShortTerm[i].instrumentalness);
      speechiness.push(audioFeaturesShortTerm[i].speechiness);
      valence.push(audioFeaturesShortTerm[i].valence);
      tempo.push(audioFeaturesShortTerm[i].tempo);
    }
    for (let i = 0; i < audioFeaturesMediumTerm.length; i++) {
      acousticness.push(audioFeaturesMediumTerm[i].Acousticness);
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
          'Acousticness is a measure from 0.0 to 1.0 of how acoustic your tracks are, where 1.0 is most acoustic and 0.0 is least acoustic.',
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
  return (
    <div>
      <button onClick={TopAudioFeaturesCalled}>Show audio Features</button>({' '}
      {!topAudioFeatures.isLoading && (
        <TopFeatures topAudioFeatures={topAudioFeatures} />
      )}
      )
    </div>
  );
};

export default UserTopFeatures;

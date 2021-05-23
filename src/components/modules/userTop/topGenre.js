import React from 'react';

const TopGenre = ({ topArtists }) => {
  const [topGenre, setTopGenre] = React.useState({});

    React.useEffect(() => {
        
       setTopGenre()
   }) 
    
  return <div>topGenre in userTop;</div>;
};
export default TopGenre;

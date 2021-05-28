import React from 'react';
//from top artists
const TopGenre = ({ topArtists }) => {
  
  let topGenre = {};
  const addGenre = (artistGenres, topGenre) =>{
    console.log("add genre called")
    for (let i = 0;  i < artistGenres.length; i++) {
     const g = artistGenres[i]
       if(g) 
       topGenre[g] += 1
       else
       topGenre[g] = 1
    }
    return topGenre
  }  
  //Get topGenre from user's top artists
  const  getTopGenres = () => {
      topGenre = {};
      console.log("Get top Genre called")
    let artists = topArtists;
    for (let i = 0; i < artists.length; i++) {
      topGenre = addGenre(artists[i].genres, topGenre);
    }
    return topGenre;
  }

   console.log("jfks",topGenre) 
  return <div>
    <p>
    This is from  topGenre in userTop
    </p>
       <button onClick = {getTopGenres}>click to get genre</button> 
    </div>;
};
export default TopGenre;

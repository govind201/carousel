import React from 'react';
import { Doughnut} from "react-chartjs-2";



const TopGenre = ({ topArtists }) => {

  console.log("TopArtists in TopGenre", topArtists);
 const[genre, setGenre] = React.useState([]);
 const[data, setData] = React.useState({
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      arr: [],
  labels: [],
    }
  ]
 } );
 const[dataLoaded, setDataLoaded] = React.useState(false);
 let topGenre = {};

 const fillStates = (topGenre) => {
   let dataArr = [];
   let labelArr = [];
   for (const  [keyy, value] of Object.entries(topGenre)){
     dataArr.push(keyy);
     labelArr.push(value);
   }
   setData({...data, arr:dataArr,labelArr:labelArr });
 }
  const addGenre = (artistGenres, topGenre) =>{
    console.log("add genre called", artistGenres)
    for (let i = 0;  i < artistGenres.length; i++) {
     const g = artistGenres[i]
       if(topGenre[g]) 
       topGenre[g] += 1
       else
       topGenre[g] = 1
    }
    return topGenre
  }  
  const  getTopGenres = () => {
      topGenre = {};
      console.log("Get top Genre called")
    let artists = topArtists;
    for (let i = 0; i < artists.length; i++) {
      topGenre = addGenre(artists[i].genres, topGenre);
    }
     setGenre(topGenre)
     fillStates(topGenre)
     setDataLoaded(true)

  }

   console.log("jfks",genre) 
  return <div>
    <p>
    This is from  topGenre in userTop
    </p>
       <button onClick = {getTopGenres}>click to get genre</button> 
      { dataLoaded &&
<Doughnut data = {data} />
      } 
    </div>;
};
export default TopGenre;
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { chartColors } from '../colors';
import '../topGenre.css';

const TopGenre = ({ topArtists }) => {

  console.log("TopArtists in TopGenre", topArtists);
 const[genre, setGenre] = React.useState([]);
 const[data, setData] = React.useState([]);
 const[dataLoaded, setDataLoaded] = React.useState(false);
 let topGenre = {};

 const fillStates = (topGenre) => {
   
   let chartData = [];
   let dataArr = [];
   let labelArr = [];
   const sortable = Object.entries(topGenre)
    .sort(([,a],[,b]) =>  a - b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

   for (const  [keyy, value] of Object.entries(sortable)){
     dataArr.push(value);
     labelArr.push(keyy);
   }
   console.log("fill States called", dataArr, " lableArr", labelArr);
   for(let i = 0; i < 10; i++) {
        chartData.push({
          title: labelArr[i],
          color:  chartColors[Math.floor(Math.random() * chartColors.length)],
          value: dataArr[i],
        }) 
   }
    setData(chartData);
    console.log("charData",chartData);
      setDataLoaded(true);
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
  const  getTopGenres = (topArtists) => {
      topGenre = {};
      console.log("Get top Genre called")
    let artists = [...topArtists];
    for (let i = 0; i < artists.length; i++) {
      topGenre = addGenre(artists[i].genres, topGenre);
    }
     setGenre(topGenre)
     fillStates(topGenre)
  }
   console.log("genre",genre) 
  return <div className='top-genere'>
   {
  dataLoaded &&
  <PieChart
  data={data}
   radius={30}
   startAngle={400}
   label={(data) => data.dataEntry.title}
   labelStyle={{
    fontSize: "2px",
    fontColor: "FFFFFA",
    fontWeight: "80",
  }}

  />
  } 
       <button onClick = {() => getTopGenres(topArtists)}>click to get genre</button> 
    </div>;
};
export default TopGenre;
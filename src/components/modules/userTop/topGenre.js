import React, { } from 'react';
import { AgChartsReact } from "ag-charts-react";
import "../topGenre.css"
import "bootstrap/dist/css/bootstrap.min.css";

const TopGenre = ({ topArtists }) => {

  console.log("TopArtists in TopGenre", topArtists);
 const[genre, setGenre] = React.useState([]);
 const[dataLoaded, setDataLoaded] = React.useState(false);
 const[data, setData] = React.useState({});
 let topGenre = {};

 const fillStates = (topGenre) => {
   
   let chartData = [];
   let dataArr = [];
   let labelArr = [];
   const sortable = Object.entries(topGenre)
    .sort(([,a],[,b]) =>  b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
   for (const  [keyy, value] of Object.entries(sortable)){
     dataArr.push(value);
     labelArr.push(keyy);
   }
   console.log("fill States called", dataArr, " lableArr", labelArr);
   for(let i = 0; i < 10; i++) {
        chartData.push({
          label: labelArr[i],
          value: dataArr[i],
        }) 
   }
   let options = {}; 
   options['data'] = chartData;
   options['series'] = [
    {
      type: "pie",
      angleKey: "value",
      labelKey: "label"
    }
  ];
    setData(options);
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
  return (<div className='top-genere'>
       <button type="button" onClick = {() => getTopGenres(topArtists)}>Top Genre</button>
   {
  dataLoaded &&
  <AgChartsReact class = 'pie-chart' options = {data} />
  } 
    </div>);
};
export default TopGenre;
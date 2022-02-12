import React from "react";
import { AgChartsReact } from "ag-charts-react";
import "../topGenre.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import "bootstrap/dist/css/bootstrap.min.css";

const TopGenre = ({ topArtists }) => {
  console.log("TopArtists in TopGenre", topArtists);
  const [genre, setGenre] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [data, setData] = React.useState({});
  let topGenre = {};

  const fillStates = (topGenre) => {
    let chartData = [];
    let dataArr = [];
    let labelArr = [];
    const sortable = Object.entries(topGenre)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    for (const [keyy, value] of Object.entries(sortable)) {
      dataArr.push(value);
      labelArr.push(keyy);
    }
    console.log("fill States called", dataArr, " lableArr", labelArr);
    for (let i = 0; i < 10; i++) {
      chartData.push({
        label: labelArr[i],
        value: dataArr[i],
      });
    }
    let options = {};
    options["data"] = chartData;
    options["series"] = [
      {
        type: "pie",
        angleKey: "value",
        labelKey: "label",
      },
    ];
    setData(options);
    console.log("charData", chartData);
    setDataLoaded(true);
  };
  const addGenre = (artistGenres, topGenre) => {
    console.log("add genre called", artistGenres);
    for (let i = 0; i < artistGenres.length; i++) {
      const g = artistGenres[i];
      if (topGenre[g]) topGenre[g] += 1;
      else topGenre[g] = 1;
    }
    return topGenre;
  };
  const getTopGenres = (topArtists) => {
    topGenre = {};
    console.log("Get top Genre called");
    let artists = [...topArtists];
    for (let i = 0; i < artists.length; i++) {
      topGenre = addGenre(artists[i].genres, topGenre);
    }
    setGenre(topGenre);
    fillStates(topGenre);
  };
  console.log("genre", genre);
  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(445deg, #2196F3 30%, #21CBF3 90%)",
      border: 0,
      margin:400,
      width: 500,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  });
  const classes = useStyles();
  return (
    <div className="top-genere">
      <Button
        onClick={() => getTopGenres(topArtists)}
        className={classes.root}
        type="button"
        style={{ textDecoration: "none", color: "white", margin:50 }}
      >
        Top Genre
      </Button>
      {dataLoaded && <AgChartsReact class="pie-chart" options={data} />}
    </div>
  );
};
export default TopGenre;

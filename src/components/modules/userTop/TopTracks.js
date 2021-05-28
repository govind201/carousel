import React from 'react';
import useIsMounted from '../../../utils/useIsMounted';

const TopTracks = ({ token }) => {
  const [topTracksShortTerm, setTopTracksShortTem] = React.useState([]);
  const [topTracksMediumTerm, setTopTracksMediumTerm] = React.useState([]);
  const [topTracksLongTerm, setTopTracksLongTerm] = React.useState([]);
  // const [dataLoaded, setDataLoaded] = React.useState(false)
  const isMounted = useIsMounted();

  React.useEffect(() => {
    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
         console.log("data in topTacks short term in modules usertop", data)
        if (isMounted()) {
          return data.items.map((item) =>
            setTopTracksShortTem((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
              },
            ])
          );
        }
      })

      .catch((error) => console.log(error));

    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted()) {
          return data.items.map((item) =>
            setTopTracksMediumTerm((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
              },
            ])
          );
        }
      })

      .catch((error) => console.log(error));
      
    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted()) {
          return data.items.map((item) =>
            setTopTracksLongTerm((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
              },
            ])
          );
        }
      })

      .catch((error) => console.log(error));
  }, [token, isMounted]);

  // React.useEffect(()=>{
  //   if(topTracksLongTerm.length === 50 && topTracksMediumTerm.length === 50 && topTracksShortTerm.length === 50)
  //      setDataLoaded(true)
  // },[topTracksLongTerm.length, topTracksMediumTerm.length, topTracksShortTerm.length])

  console.log(topTracksLongTerm)
  console.log(topTracksMediumTerm)
  return (
    <div>
      <p> user top Tracks</p>
      <ol>
        {topTracksShortTerm.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopTracks;

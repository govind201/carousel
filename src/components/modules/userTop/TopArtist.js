import React from 'react';
import useIsMounted from '../../../utils/useIsMounted';

import TopGenre from './topGenre';
const TopArtist = ({ token }) => {
  const [topArtists, setTopArtists] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term',
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          console.log("from topArtists in isMounted",data.items)
          return data.items.map((item) =>
            setTopArtists((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
                genres: item.genres,
              },
            ])
          );
        }
      })
      .catch((err) => console.log(err));
  }, [token, isMounted]);


  React.useEffect(()=> {
    if(topArtists.length === 5 ) 
     setIsLoaded(true)
  }, [topArtists.length])
console.log(topArtists)
  return (
    <div>
      <p>USer top artists</p>
      <ol>
        {topArtists.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>
        { isLoaded && <TopGenre topArtists={topArtists} />}  
    </div>
  );
};

export default TopArtist;

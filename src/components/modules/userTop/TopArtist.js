import React from 'react';
import useIsMounted from '../../../utils/useIsMounted';
import TopGenre from './topGenre';
const TopArtist = ({ token }) => {
  const [topArtists, setTopArtists] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const isMounted = useIsMounted();
  React.useEffect(() => {
    fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          return data.items.map((item) =>
            setTopArtists((prevState) => [
              ...prevState,
              {
                id: item.id,
                name: item.name,
                genre: item.genre,
              },
            ])
          );
        }
      })
      .catch((err) => console.log(err));
    setIsLoaded(true);
  }, [token, isMounted]);
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
      ( {isLoaded && <TopGenre topArtists={TopArtist} />})
    </div>
  );
};

export default TopArtist;

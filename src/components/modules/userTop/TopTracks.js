import React from 'react';
import useIsMounted from '../../../utils/useIsMounted';

const TopTracks = ({ token }) => {
  const [topTracksShortTerm, setTopTracksShortTem] = React.useState([]);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
      { headers: { Authorization: 'Bearer ' + token } }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("to check somehting",data)
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
  }, [token, isMounted]);
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

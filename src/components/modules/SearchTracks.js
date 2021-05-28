import React from 'react';
import Detail from '../modules/Detail';
import DropDown from '../modules/DropDown';
import ListBox from '../modules/ListBox';
import PropTypes from 'prop-types';

const SearchTracks = ({
  setToken,
  setGenre,
  setPlaylist,
  token,
  genre,
  tracks,
  playlist,
  setTracks,
  trackDetail,
  setTrackDetail,
}) => {
  React.useEffect(() => {
    fetch('https://api.spotify.com/v1/browse/categories/locale=sv_US', {
      headers: {
        Authorization: 'Bearer' + token,
      },
      method: 'GET',
    })
      .then((response) => response.jsonj())
      .then((genreData) =>
        setGenre({
          ...genre,
          genresFromAPI: genreData.data.categories.items,
        })
      )
      .catch((err) => console.log(err));
  }, [genre, setGenre, setToken, token]);

  const genreChanged = (category) => {
    setGenre({
      selectedGenre: category,
      ...genre,
    });
    fetch(
      `https://api.spotify.com/v1/browse/categories/${category}/playlist?limit=10`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer' + token },
      }
    )
      .then((response) => response.json())
      .then((playlistResponse) =>
        setPlaylist((prevPlaylist) => ({
          ...prevPlaylist,
          playlistFromAPI: playlistResponse.data.playlist.items,
        }))
      );

    console.log(category);
  };

  const playlistChanged = (playlist) => {
    setPlaylist((prevPlaylist) => ({
      ...prevPlaylist,
      selectedPlaylist: playlist,
    }));
  };

  const searchButtonClicked = (event) => {
    fetch(
      ` https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
      {
        headers: { Authorization: 'Bearer' + token },
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((responseTracks) =>
        setTracks((prevTracks) => ({
          ...prevTracks,
          tracksFromAPI: responseTracks.data.items,
        }))
      );
  };

  const listBoxClicked = (track) => {
    const currentTracks = tracks.tracksFromAPI;
    const trackInfo = currentTracks.filter(
      (currentTrack) => currentTrack.track.id === track.id
    );

    setTrackDetail(trackInfo[0].track);
  };

  return (
    <div>
      <form onSubmit={searchButtonClicked}>
        <DropDown
          label="genre :"
          options={genre.genresFromAPI}
          value={genre.selectedGenre}
          changed={genreChanged}
        />
        <DropDown
          label="playlist:"
          options={playlist.playlistFromAPI}
          value={playlist.selectedPlaylist}
          changed={playlistChanged}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <ListBox items={tracks.tracksFromAPI} clicked={listBoxClicked} />
      </div>
      <div>{trackDetail && <Detail {...trackDetail} />}</div>
    </div>
  );
};

SearchTracks.prototype = {
  setToken: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  genre: PropTypes.shape({
    selectedGenre: PropTypes.string.isRequired,
    selectedGenreFromAPI: PropTypes.array.isRequired,
  }),
  tracks: PropTypes.shape({
    selectedTrack: PropTypes.string.isRequired,
    tracksFromAPI: PropTypes.array.isRequired,
  }),
  playlist: PropTypes.shape({
    selectedPlaylist: PropTypes.string.isRequired,
    playlistFromAPI: PropTypes.array.isRequired,
  }),
  setTracks: PropTypes.func.isRequired,
  trackDetail: PropTypes.object,
  setTrackDetail: PropTypes.func.isRequired,
};
export default SearchTracks;

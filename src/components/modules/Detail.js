import React from 'react';

const Detail = ({ artists, name, albumb }) => {
  return (
    <div>
      <img href={albumb.images[0].url} alt={name} />
      <h4>{name}</h4>
      <div>{artists[0].name}</div>
    </div>
  );
};

export default Detail;

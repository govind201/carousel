import React from 'react';

const ListBox = ({ items, clicked }) => {
  const buttonClicked = (track) => {
    clicked(track);
  };
  return (
    <div>
      <div>
        {items.map((item, idx) => (
          <div>
            <button key={idx} id={item.track.id}>
              {item.track.name}
              onClick = {() => buttonClicked(item.track)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBox;

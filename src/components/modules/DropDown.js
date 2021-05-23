import React from 'react';
import PropTypes from 'prop-types';
const DropDown = ({ name, options, changed, value }) => {
  const optionsChanged = (e) => {
    changed(e.target.value);
  };
  return (
    <div>
      <label>Select {name}:</label>
      <select onChange={optionsChanged}>
        {options.map((item, idx) => (
          <option value={item.value} key={idx}>
            {item.name}
          </option>
        ))}
      </select>
      <div> {value}</div>
    </div>
  );
};

PropTypes.DropDown = {
  name: PropTypes.string,
  options: PropTypes.array,
  changed: PropTypes.bool,
  value: PropTypes.string,
};
export default DropDown;

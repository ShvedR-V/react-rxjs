import React from 'react';

export const Sensor = ({ name, value }) => {
  return (
    <div>
      {name}
      <br />
      {value ? value : 'no data'}
    </div>
  );
};

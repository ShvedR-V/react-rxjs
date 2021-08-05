import React from 'react';

export const Sensor = ({ name, sensorValue }) => {
  if (sensorValue) {
    return (
      <div>
        {name}
        <br />
        {sensorValue.interval < 1300 ? sensorValue.value : 'no data'}
      </div>
    );
  }
  return null;
};

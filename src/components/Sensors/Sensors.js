import React from 'react';
import { Sensor } from './Sensor/Sensor';

export const Sensors = () => {
  return (
    <div>
      <Sensor name="A" value={Math.random()} />
      <Sensor name="B" value={Math.random()} />
      <Sensor name="C" value={Math.random()} />
      <Sensor name="D" value={0} />
    </div>
  );
};

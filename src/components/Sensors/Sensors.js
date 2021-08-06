import React, { useEffect, useState } from 'react';
import { combineLatest, throttleTime } from 'rxjs';
import { createSensorValue$ } from '../../store/rx';
import { Sensor } from './Sensor/Sensor';

const sensorsData = {
  A: createSensorValue$(),
  B: createSensorValue$(),
  C: createSensorValue$(),
  D: createSensorValue$(),
};

const allSensors = combineLatest(sensorsData).pipe(throttleTime(200));

export const Sensors = () => {
  const [sensors, setSensors] = useState();

  useEffect(() => {
    allSensors.subscribe(setSensors);
  }, []);

  // console.log(Date.now());
  if (sensors && sensors.A && sensors.B && sensors.C && sensors.D) {
    return (
      <div>
        {Object.entries(sensors).map((sensor, index) => {
          return (
            <Sensor key={index} name={sensor[0]} sensorValue={sensor[1]} />
          );
        })}
      </div>
    );
  }
  return null;
};

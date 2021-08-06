import React, { useEffect, useState } from 'react';
import { combineLatest, throttleTime } from 'rxjs';
import { createSensorValue$ } from '../../rx/createSensorValue';
import { Sensor } from './Sensor';

const sensorsData = {
  A: createSensorValue$(),
  B: createSensorValue$(),
  C: createSensorValue$(),
  D: createSensorValue$(),
};

const allSensors = combineLatest(sensorsData).pipe(throttleTime(200));

export const SensorList = () => {
  const [sensors, setSensors] = useState();

  useEffect(() => {
    const subscription = allSensors.subscribe(setSensors);
    return () => subscription.unsubscribe();
  }, []);

  if (sensors) {
    return (
      <div style={styles.sensorsContainer}>
        {Object.entries(sensors).map(([name, value]) => {
          return <Sensor key={name} name={name} sensorValue={value} />;
        })}
      </div>
    );
  }
  return null;
};

const styles = {
  sensorsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    height: '100vh',
  },
};

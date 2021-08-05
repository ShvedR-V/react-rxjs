import React, { useEffect, useState } from 'react';
import { sensorValue$ } from '../../store/rx';
import { Sensor } from './Sensor/Sensor';

export const Sensors = () => {
  const [sensorA, setSensorA] = useState();
  const [sensorB, setSensorB] = useState();
  const [sensorC, setSensorC] = useState();
  const [sensorD, setSensorD] = useState();

  useEffect(() => {
    const subscriptionA = sensorValue$.subscribe(setSensorA);
    const subscriptionB = sensorValue$.subscribe(setSensorB);
    const subscriptionC = sensorValue$.subscribe(setSensorC);
    const subscriptionD = sensorValue$.subscribe(setSensorD);
    return () => {
      subscriptionA.unsubscribe();
      subscriptionB.unsubscribe();
      subscriptionC.unsubscribe();
      subscriptionD.unsubscribe();
    };
  }, [setSensorA, setSensorB, setSensorC, setSensorD]);

  if (sensorA && sensorB && sensorC && sensorD) {
    return (
      <div>
        <Sensor name="A" sensorValue={sensorA} />
        <Sensor name="B" sensorValue={sensorB} />
        <Sensor name="C" sensorValue={sensorC} />
        <Sensor name="D" sensorValue={sensorD} />
      </div>
    );
  }
  return null;
};

import React from 'react';
import './App.css';
import { SensorList } from './SensorList/SensorList';

import { createSensorValue$ } from '../rx/createSensorValue';

const sensorsData = {
  A: createSensorValue$(),
  B: createSensorValue$(),
  C: createSensorValue$(),
  D: createSensorValue$(),
};

function App() {
  return (
    <div className="App">
      <SensorList sensorsData={sensorsData} />
    </div>
  );
}

export default App;

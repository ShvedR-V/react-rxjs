import React from 'react';
import './App.css';
import { Sensors } from './Sensors/Sensors';
import * as Rx from 'rxjs';

console.log(Rx);

function App() {
  return (
    <div className="App">
      <Sensors />
    </div>
  );
}

export default App;

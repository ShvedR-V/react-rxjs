import { Observable } from 'rxjs';

const getIntervalValue = (max, min) => {
  return Math.random() * (max - min) + min;
};

const getRandomValue = () => {
  return Math.round(Math.random() * 100);
};

export const sensorValue$ = new Observable((subscriber) => {
  let timeout = null;
  function push() {
    const intervalValue = getIntervalValue(1500, 200);
    const randomSensorValue = getRandomValue();
    timeout = setTimeout(() => {
      subscriber.next({ value: randomSensorValue, interval: intervalValue });
      push();
    }, intervalValue);
  }
  push();

  return () => clearTimeout(timeout);
});

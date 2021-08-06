import { Observable } from 'rxjs';

const getIntervalValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomValue = () => {
  return Math.round(Math.random() * 100);
};

export const createSensorValue$ = (name) => {
  let subscriber;

  let timeout = null;

  function push() {
    console.log('push!', name);
    const intervalValue = getIntervalValue(200, 1500);
    const randomSensorValue = getRandomValue();

    timeout = setTimeout(() => {
      console.log('time!', name, !!subscriber);
      if (subscriber) {
        subscriber.next({ value: randomSensorValue, timestamp: Date.now() });
      }

      push();
    }, intervalValue);
  }

  push();

  return new Observable((_subscriber) => {
    subscriber = _subscriber;

    return () => {
      clearTimeout(timeout);
    };
  });
};

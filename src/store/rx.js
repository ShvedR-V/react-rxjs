import {
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  Observable,
  of,
  switchMap,
  throttle,
  timer,
} from 'rxjs';

const clicks = fromEvent(document, 'click');
export const result = clicks.pipe(throttle((ev) => interval(1000)));

const getIntervalValue = (max, min) => {
  return Math.random() * (max - min) + min;
};

const getRandomValue = () => {
  return Math.round(Math.random() * 100);
};

export const sensors$ = from(['A', 'B', 'C', 'D']).pipe(
  map((sensor) => ({
    [sensor]: {
      value: getRandomValue(),
      interval: getIntervalValue(1500, 200),
    },
  }))
);

export const sensorAlt$ = of('').pipe(
  map((sensor) => ({
    value: getRandomValue(),
    interval: getIntervalValue(1500, 200),
  })),
  switchMap(() =>
    timer(getIntervalValue(1500, 200)).pipe(
      mapTo(() => ({
        value: getRandomValue(),
        interval: getIntervalValue(1500, 200),
      }))
    )
  )
);

export const createSensorValue$ = () =>
  new Observable((subscriber) => {
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

// test

//emit every 2.5 seconds
const first = interval(2500);
//emit every 2 seconds
const second = interval(2000);
//emit every 1.5 seconds
const third = interval(1500);
//emit every 1 second
const fourth = interval(1000);

export const example = merge(
  first.pipe(mapTo('FIRST!')),
  second.pipe(mapTo('SECOND!')),
  third.pipe(mapTo('THIRD')),
  fourth.pipe(mapTo('FOURTH'))
).pipe(throttle(1000));

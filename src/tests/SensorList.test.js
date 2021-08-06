import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import { SensorList } from '../components/SensorList/SensorList';
import { createSensorValue$, getIntervalValue } from '../rx/createSensorValue';
import { take } from 'rxjs';

// jest.setTimeout(10000);
// jest.useFakeTimers();

describe('SensorList', () => {
  describe('contains latest value of each sensor A, B, C, D', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test.only('All 4 sensors must emit at least one value before the first “view object” is ever displayed on the dashboard.', async () => {
      const sensorsData = {
        A: createSensorValue$('A').pipe(take(1)),
        B: createSensorValue$('B').pipe(take(1)),
        C: createSensorValue$('C').pipe(take(1)),
        D: createSensorValue$('D').pipe(take(1)),
      };

      // sensorsData.A.subscribe((x) => console.log('A >>>', x));
      // sensorsData.B.subscribe((x) => console.log('B >>>', x));
      // sensorsData.C.subscribe((x) => console.log('C >>>', x));
      // sensorsData.D.subscribe((x) => console.log('D >>>', x));
      // combineLatest(sensorsData).subscribe((x) => console.log('all >>>', x));

      // console.log(sensorsData);

      act(() => {
        ReactDOM.render(<SensorList sensorsData={sensorsData} />, container);
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(container.innerHTML).toContain('<div>');

      // expect(container.firstChild).toMatchInlineSnapshot(
      //   `<div className="App">
      //       <SensorList />
      //     </div>`
      // );
    });
  });
});

// afterEach(() => {});

describe('counter test', () => {
  it('should pass', () => {
    const sensorSpy = jest
      .spyOn(createSensorValue$(), 'push')
      .mockReturnValueOnce({
        value: getIntervalValue(),
        timestamp: Date.now(),
      });
    // const actualSensor =
  });
});

// jest.useFakeTimers('legacy');
// test('App component renders SensorList', () => {
//   const { container } = render(<App />);
//   expect(container.firstChild).toMatchSnapshot(
//     `<div className="App">
//       <SensorList />
//     </div>`
//   );
// });

// test.only('SensorList should render null on first render', () => {
//   const sensorsData = {
//     A: createSensorValue$().pipe(take(1)),
//     B: createSensorValue$().pipe(take(1)),
//     C: createSensorValue$().pipe(take(1)),
//     D: createSensorValue$().pipe(take(1)),
//   };
//   const { container, rerender } = render(
//     <SensorList sensorsData={sensorsData} />
//   );
//   expect(container.firstChild).toBeNull();
//   rerender(<SensorList sensorsData={sensorsData} />);
//   expect(container.firstChild).toBeTruthy();
// });

// describe('rxjs-marbles', () => {
//   it('rxjs test', (done) => {
//     const observer = createSensorValue$();
//     console.log('observer');
//     observer.pipe(take(1)).subscribe((sensor) => {
//       console.log('sensor', sensor);
//       expect(sensor.value)
//         .toBeLessThanOrEqual(1500)
//         .toBeGreaterThanOrEqual(200);
//       done();
//     });
//   });
// });

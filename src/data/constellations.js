export default [
  {
    name: 'Aquarius',
    left: '45.49%',
    top: '17.07%',
    width: '23.34%',
    height: '24.57%',
    stars: [
      ['44.38%', '18.40%'],
      ['64.33%', '25.60%'],
      ['77.53%', '35.20%'],
      ['88.06%', '29.87%'],
      ['41.71%', '34.13%'],
      ['46.63%', '40.80%'],
      ['50%', '44.93%'],
      ['36.66%', '22%'],
      ['32.58%', '20%'],
      ['29.07%', '21.20%'],
      ['34.13%', '16.93%'],
      ['29.63%', '29.07%'],
      ['23.74%', '37.47%'],
      ['28.23%', '48.67%'],
      ['26.69%', '53.47%'],
      ['22.47%', '65.87%'],
      ['15.17%', '65.47%'],
      ['2.39%', '57.33%'],
      ['11.38%', '45.07%'],
      ['8.71%', '36.53%'],
    ],
    paint: [
      // start branching
      { path: [1, 2, 3, 4], timing: 'stroke-dashoffset 2000ms ease-in' },
      { path: [1, 5, 6, 7], timing: 'stroke-dashoffset 2000ms ease-in' },
      { path: [1, 8], timing: 'stroke-dashoffset 500ms ease-in' },

      // finish diversion from 8 when 8 is connected
      { path: [8, 9], timing: 'stroke-dashoffset 500ms linear 500ms' },
      { path: [9, 10], timing: 'stroke-dashoffset 250ms ease-out 1000ms' },
      { path: [9, 11], timing: 'stroke-dashoffset 250ms ease-out 1000ms' },

      // continue to to water
      { path: [8, 12, 13], timing: 'stroke-dashoffset 1500ms linear 500ms' },
      // water branches
      { path: [13, 14, 15, 16, 17], timing: 'stroke-dashoffset 2500ms ease-out 2000ms' },
      { path: [13, 20, 19, 18, 17], timing: 'stroke-dashoffset 2500ms ease-out 2000ms' },
    ],
  },
];

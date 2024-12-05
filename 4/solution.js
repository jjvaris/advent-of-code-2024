import { readRows } from '../advent.js';

const rows = readRows('4/input.txt');
// const rows = readRows('4/test-input.txt');

const width = rows[0].length;
const input = rows.map((row) => row.split(''));

function one() {
  const isMatch = ([y1, x1], [y2, x2], [y3, x3]) => {
    if (
      input[y1]?.[x1] === 'M' &&
      input[y2]?.[x2] === 'A' &&
      input[y3]?.[x3] === 'S'
    ) {
      return 1;
    }
    return 0;
  };

  const r = (y, x) => isMatch([y, x + 1], [y, x + 2], [y, x + 3]);
  const rd = (y, x) => isMatch([y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]);
  const d = (y, x) => isMatch([y + 1, x], [y + 2, x], [y + 3, x]);
  const ld = (y, x) => isMatch([y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]);
  const l = (y, x) => isMatch([y, x - 1], [y, x - 2], [y, x - 3]);
  const lu = (y, x) => isMatch([y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]);
  const u = (y, x) => isMatch([y - 1, x], [y - 2, x], [y - 3, x]);
  const ru = (y, x) => isMatch([y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]);

  const search = (y, x) =>
    r(y, x) +
    rd(y, x) +
    d(y, x) +
    ld(y, x) +
    l(y, x) +
    lu(y, x) +
    u(y, x) +
    ru(y, x);

  let count = 0;

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === 'X') {
        count += search(y, x);
      }
    }
  }

  console.log(count);
}

function two() {
  const isMatch = ([urY, urX], [drY, drX], [dlY, dlX], [ulY, ulX]) => {
    if (
      (input[urY]?.[urX] === 'M' && input[dlY]?.[dlX] === 'S') ||
      (input[urY]?.[urX] === 'S' && input[dlY]?.[dlX] === 'M')
    ) {
      if (
        (input[drY]?.[drX] === 'M' && input[ulY]?.[ulX] === 'S') ||
        (input[drY]?.[drX] === 'S' && input[ulY]?.[ulX] === 'M')
      ) {
        return 1;
      }
    }
    return 0;
  };

  let count = 0;

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === 'A') {
        count += isMatch(
          [y - 1, x + 1],
          [y + 1, x + 1],
          [y + 1, x - 1],
          [y - 1, x - 1]
        );
      }
    }
  }

  console.log(count);
}

one();
two();

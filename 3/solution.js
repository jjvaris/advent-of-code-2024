import { readRows } from '../advent.js';

const rows = readRows('3/input.txt');

const mul = (input) => {
  const [first, second] = input.split(',');
  return (
    parseInt(first.slice(4)) * parseInt(second.slice(0, second.length - 1))
  );
};

function one() {
  const input = rows[0];
  const result = input
    .match(/mul\(\d\d?\d?,\d\d?\d?\)/g)
    .map(mul)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(result);
}

function two() {
  const input = rows[0];
  const matches = input.match(/mul\(\d\d?\d?,\d\d?\d?\)|don't\(\)|do\(\)/g);
  let enabled = true;
  let result = 0;
  for (const match of matches) {
    if (match === "don't()") {
      enabled = false;
    } else if (match === 'do()') {
      enabled = true;
    } else if (enabled) {
      result += mul(match);
    }
  }
  console.log(result);
}

one();
two();

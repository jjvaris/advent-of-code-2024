import { readRows } from '../advent.js';

const rows = readRows('2/input.txt');

const isSafe = (current, next, ascending) => {
  if (ascending && current >= next) {
    return false;
  }

  if (!ascending && current <= next) {
    return false;
  }

  return Math.abs(current - next) >= 1 && Math.abs(current - next) <= 3;
};

const isSafeRow = (numbers, allowOneBad) => {
  const ascending =
    numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length > numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (!numbers[i + 1]) {
      return true;
    }
    if (!isSafe(numbers[i], numbers[i + 1], ascending)) {
      if (allowOneBad) {
        return (
          isSafeRow(
            [...numbers.slice(0, i), ...numbers.slice(i + 1, numbers.length)],
            false
          ) ||
          isSafeRow(
            [
              ...numbers.slice(0, i + 1),
              ...numbers.slice(i + 2, numbers.length),
            ],
            false
          )
        );
      }
      return false;
    }
  }
};

function one() {
  let safe = 0;
  for (const row of rows) {
    const numbers = row.split(' ').map((n) => parseInt(n));
    if (isSafeRow(numbers, false)) safe++;
  }
  console.log(safe);
}

function two() {
  let safe = 0;
  for (const row of rows) {
    const numbers = row.split(' ').map((n) => parseInt(n));
    if (isSafeRow(numbers, true)) safe++;
  }
  console.log(safe);
}

one();
two();

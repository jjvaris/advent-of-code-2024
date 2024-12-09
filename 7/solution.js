import { readRows, sum } from '../advent.js';

const rows = readRows('7/input.txt');
// const rows = readRows('7/test-input.txt');

function part1() {
  const matches = getMatchesFor(2);
  console.log('Part 1: ' + sum(matches.map(({ testValue }) => testValue)));
}

function part2() {
  const matches = getMatchesFor(3);
  console.log('Part 2: ' + sum(matches.map(({ testValue }) => testValue)));
}

function getMatchesFor(operatorCount) {
  const lines = rows.map((row) => {
    const [testValue, numbersInput] = row.split(':');
    const numbers = numbersInput
      .trim()
      .split(' ')
      .map((num) => parseInt(num));
    let combinations = [];
    const calculations = Math.pow(3, numbers.length - 1);
    for (let i = 0; i < calculations; i++) {
      combinations.push(
        String(i.toString(operatorCount))
          .padStart(numbers.length - 1, '0')
          .split('')
      );
    }
    return { testValue: parseInt(testValue), combinations, numbers };
  });

  const matches = lines.filter(({ testValue, combinations, numbers }) => {
    return combinations.some((combination) => {
      let result = numbers[0];
      for (let i = 0; i < combination.length; i++) {
        const operator = combination[i];
        const n = numbers[i + 1];
        if (operator === '0') {
          result = result + n;
        }
        if (operator === '1') {
          result = result * n;
        }
        if (operator === '2') {
          result = parseInt(`${result}${n}`);
        }
      }
      return result === testValue;
    });
  });
  return matches;
}

part1();
part2();

import { sum } from '../advent.js';
import fs from 'fs';

const file = `13/input.txt`;
// const file = `13/test-input.txt`;
const inputs = fs.readFileSync(file).toString().split('\n\n');

function part1() {
  console.log(sum(inputs.map(getMinTokens)));
}

function part2() {
  // equations - nnnoup..
}

function getMinTokens(input) {
  const details = input.split('\n');
  const [aX, aY] = getButtonBehavior(details[0]);
  const [bX, bY] = getButtonBehavior(details[1]);
  const [pX, pY] = getPrizeDetails(details[2]);
  let min = undefined;
  for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
      if (a * aX + b * bX === pX && a * aY + b * bY === pY) {
        if (min === undefined || min > a * 3 + b) {
          min = a * 3 + b;
        }
      }
    }
  }
  return min ? min : 0;
}

function getButtonBehavior(button) {
  return button.split(',').map((s) => parseInt(s.split('+')[1]));
}

function getPrizeDetails(prize) {
  return prize.split(',').map((s) => parseInt(s.split('=')[1]));
}

part1();
part2();

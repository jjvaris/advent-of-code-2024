import { readRows } from '../advent.js';

const input = readRows('1/input.txt');

let leftList = [];
let rightList = [];

for (let row of input) {
  const numbers = row.split('   ');
  leftList.push(parseInt(numbers[0]));
  rightList.push(parseInt(numbers[1]));
}

function one() {
  let leftSortedList = leftList.sort();
  let rightSortedList = rightList.sort();

  let result = 0;

  for (let i = 0; i < leftSortedList.length; i++) {
    result += Math.abs(leftSortedList[i] - rightSortedList[i]);
  }

  console.log(result);
}

function two() {
  let result = 0;

  for (let i = 0; i < leftList.length; i++) {
    let occurences = 0;
    for (let j = 0; j < leftList.length; j++) {
      if (leftList[i] === rightList[j]) occurences++;
    }
    result += leftList[i] * occurences;
  }

  console.log(result);
}

one();
two();

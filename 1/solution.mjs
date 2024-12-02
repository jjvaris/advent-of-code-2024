import Advent from '../advent.mjs';

class Advent1 extends Advent {
  constructor() {
    super(1);
  }

  executeFirstAdvent(input) {
    let leftList = [];
    let rightList = [];

    for (let row of input) {
      const numbers = row.split('   ');
      leftList.push(parseInt(numbers[0]));
      rightList.push(parseInt(numbers[1]));
    }

    let leftSortedList = leftList.sort();
    let rightSortedList = rightList.sort();

    this.leftList = leftSortedList;
    this.rightList = rightSortedList;

    let result = 0;

    for (let i = 0; i < leftSortedList.length; i++) {
      result += Math.abs(leftSortedList[i] - rightSortedList[i]);
    }

    return result;
  }

  executeSecondAdvent() {
    let result = 0;

    for (let i = 0; i < this.leftList.length; i++) {
      let occurences = 0;
      for (let j = 0; j < this.leftList.length; j++) {
        if (this.leftList[i] === this.rightList[j]) occurences++;
      }
      result += this.leftList[i] * occurences;
    }

    return result;
  }
}

export default Advent1;

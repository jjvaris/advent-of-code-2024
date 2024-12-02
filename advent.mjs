import fs from 'fs';

export const readRows = (filename) =>
  fs.readFileSync(`./${filename}`).toString().split('\n');

class Advent {
  constructor(day) {
    this.day = day;
  }

  executeAdvent() {
    const input = readRows(`./${this.day}/input.txt`);
    console.log(`Advent ${this.day} Task 1:`);
    console.log(`Result: ${this.executeFirstAdvent(input)}`);
    console.log(`Advent ${this.day} Task 2:`);
    console.log(`Result: ${this.executeSecondAdvent(input)}`);
  }

  // eslint-disable-next-line no-unused-vars
  executeFirstAdvent(input) {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line no-unused-vars
  executeSecondAdvent(input) {
    throw new Error('Not implemented');
  }
}

export default Advent;

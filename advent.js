import fs from 'fs';

export const readRows = (filename) =>
  fs.readFileSync(`./${filename}`).toString().split('\n');

export const sum = (numbers) => numbers.reduce((acc, cur) => (acc += cur), 0);

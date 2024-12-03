import fs from 'fs';

export const readRows = (filename) =>
  fs.readFileSync(`./${filename}`).toString().split('\n');

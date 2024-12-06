import { readRows } from '../advent.js';

// node --stack-size=8192 6/solution.js
const rows = readRows('6/input.txt');
// const rows = readRows('6/test-input.txt');

function one() {
  const map = rows.map((row) => row.split(''));
  const [startX, startY] = getGuardLocation(map);
  map[startY][startX] = 'X';
  move(map, startX, startY, 'up', 0);
  console.log(countXs(map));
}

function two() {
  const originalMap = rows.map((row) => row.split(''));
  const [startX, startY] = getGuardLocation(originalMap);
  let loops = 0;
  for (let oy = 0; oy < originalMap.length; oy++) {
    for (let ox = 0; ox < originalMap[0].length; ox++) {
      if (ox === startX && oy === startY) {
        continue;
      }
      const map = originalMap.map((row) => row.slice());
      map[startY][startX] = 'X';
      map[oy][ox] = '#';
      if (move(map, startX, startY, 'up', 0) === 'loop') loops++;
    }
  }
  console.log(loops);
}

function move(map, x, y, currentDirection, moveCount) {
  if (moveCount > map.length * map[0].length) {
    return 'loop';
  }
  if (currentDirection === 'up') {
    if (map[y - 1]?.[x] === '#') {
      return move(map, x, y, 'right', moveCount + 1);
    }
    if (['X', '.'].includes(map[y - 1]?.[x])) {
      map[y - 1][x] = 'X';
      return move(map, x, y - 1, currentDirection, moveCount + 1);
    }
  }
  if (currentDirection === 'right') {
    if (map[y]?.[x + 1] === '#') {
      return move(map, x, y, 'down', moveCount + 1);
    }
    if (['X', '.'].includes(map[y]?.[x + 1])) {
      map[y][x + 1] = 'X';
      return move(map, x + 1, y, currentDirection, moveCount + 1);
    }
  }
  if (currentDirection === 'down') {
    if (map[y + 1]?.[x] === '#') {
      return move(map, x, y, 'left', moveCount + 1);
    }
    if (['X', '.'].includes(map[y + 1]?.[x])) {
      map[y + 1][x] = 'X';
      return move(map, x, y + 1, currentDirection, moveCount + 1);
    }
  }
  if (currentDirection === 'left') {
    if (map[y]?.[x - 1] === '#') {
      return move(map, x, y, 'up', moveCount + 1);
    }
    if (['X', '.'].includes(map[y]?.[x - 1])) {
      map[y][x - 1] = 'X';
      return move(map, x - 1, y, currentDirection, moveCount + 1);
    }
  }
  return map;
}

function countXs(map) {
  return map.reduce(
    (acc, row) => (acc += (row.join('').match(/X/g) ?? []).length),
    0
  );
}

function getGuardLocation(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '^') {
        return [x, y];
      }
    }
  }
  throw new Error('no guard found');
}

one();
two();

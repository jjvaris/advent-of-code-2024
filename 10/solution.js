import { readRows } from '../advent.js';

const rows = readRows('10/input.txt');
//const rows = readRows('10/test-input.txt');
const map = rows.map((row) => row.split('').map((d) => parseInt(d)));
const width = map[0].length;
const height = map.length;
const up = [0, -1];
const right = [1, 0];
const down = [0, 1];
const left = [-1, 0];
const directions = [up, right, down, left];

function part1() {
  console.log('Result part 1:', getScores(false));
}

function part2() {
  console.log('Result part 2:', getScores(true));
}

function getScores(distinct) {
  let scores = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === 0) {
        const trails = directions.flatMap((direction) =>
          findTrails(x, y, direction)
        );
        if (distinct) {
          scores += trails.length;
        } else {
          scores += new Set(
            directions.flatMap((direction) => findTrails(x, y, direction))
          ).size;
        }
      }
    }
  }
  return scores;
}

function findTrails(x, y, direction) {
  const current = map[y]?.[x];
  if (current === undefined) {
    return [];
  }
  const nextX = x + direction[0];
  const nextY = y + direction[1];
  const next = map[nextY]?.[nextX] ?? -1;
  if (next === 9 && current === 8) {
    return [`${nextX}:${nextY}`];
  }
  if (next === current + 1) {
    return directions.flatMap((nextDirection) =>
      findTrails(nextX, nextY, nextDirection)
    );
  }
  return [];
}

part1();
part2();

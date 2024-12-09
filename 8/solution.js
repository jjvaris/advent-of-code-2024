import { readRows, sum } from '../advent.js';

const rows = readRows('8/input.txt');
//const rows = readRows('8/test-input.txt');

function part1() {
  const map = parseMap(rows);
  const antinodes = getMapWithAntinodes(map);
  const result = sum(antinodes.map((r) => r.join('').match(/#/g)?.length ?? 0));
  console.log(result);
}

function part2() {
  const map = parseMap(rows);
  const antinodes = getMapWithAntinodes(map, true);
  const result = sum(
    antinodes.map((r) => r.join('').match(/#|\w/g)?.length ?? 0)
  );
  console.log(result);
}

function parseMap(input) {
  return input.map((r) => r.split(''));
}

function getMapWithAntinodes(map, longDistance = false) {
  const antinodes = parseMap(rows);
  const width = map[0].length;
  const height = map.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].match(/\w/)) {
        findAndMarkAntinodes(map, x, y, antinodes, longDistance);
      }
    }
  }
  return antinodes;
}

function findAndMarkAntinodes(map, x, y, antinodes, longDistance = false) {
  const width = map[0].length;
  const height = map.length;
  const frequence = map[y][x];
  for (let y2 = 0; y2 < height; y2++) {
    for (let x2 = 0; x2 < width; x2++) {
      if (x === x2 && y === y2) {
        continue;
      }
      if (map[y2][x2] === frequence) {
        markAntinodes(map, x, y, x2, y2, antinodes, longDistance);
      }
    }
  }
}

function markAntinodes(map, x, y, x2, y2, antinodes, longDistance) {
  if (x <= x2) {
    if (y <= y2) {
      if (map[y2 + Math.abs(y - y2)]?.[x2 + Math.abs(x - x2)]) {
        antinodes[y2 + Math.abs(y - y2)][x2 + Math.abs(x - x2)] = '#';
        if (longDistance) {
          markAntinodes(
            map,
            x2,
            y2,
            x2 + Math.abs(x - x2),
            y2 + Math.abs(y - y2),
            antinodes,
            longDistance
          );
        }
      }
    }
    if (y >= y2) {
      if (map[y2 - Math.abs(y - y2)]?.[x2 + Math.abs(x - x2)]) {
        antinodes[y2 - Math.abs(y - y2)][x2 + Math.abs(x - x2)] = '#';
        if (longDistance) {
          markAntinodes(
            map,
            x2,
            y2,
            x2 + Math.abs(x - x2),
            y2 - Math.abs(y - y2),
            antinodes,
            longDistance
          );
        }
      }
    }
  } else {
    if (y <= y2) {
      if (map[y2 + Math.abs(y - y2)]?.[x2 - Math.abs(x - x2)]) {
        antinodes[y2 + Math.abs(y - y2)][x2 - Math.abs(x - x2)] = '#';
        if (longDistance) {
          markAntinodes(
            map,
            x2,
            y2,
            x2 - Math.abs(x - x2),
            y2 + Math.abs(y - y2),
            antinodes,
            longDistance
          );
        }
      }
    }
    if (y >= y2) {
      if (map[y2 - Math.abs(y - y2)]?.[x2 - Math.abs(x - x2)]) {
        antinodes[y2 - Math.abs(y - y2)][x2 - Math.abs(x - x2)] = '#';
        if (longDistance) {
          markAntinodes(
            map,
            x2,
            y2,
            x2 - Math.abs(x - x2),
            y2 - Math.abs(y - y2),
            antinodes,
            longDistance
          );
        }
      }
    }
  }
}

part1();
part2();

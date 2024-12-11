import { memoize } from '../advent.js';

const input = '4189 413 82070 61 655813 7478611 0 8';
const stones = input.split(' ').map((d) => parseInt(d));

function part1() {
  console.log('Part 1:', getStoneCount(stones, 25));
}

function part2() {
  console.log('Part 2:', getStoneCount(stones, 75));
}

function getStoneCount(stones, blinks) {
  return stones.reduce(
    (sum, stone) => (sum += memoizedBlink(stone, blinks)),
    0
  );
}

const memoizedBlink = memoize(blink);

function blink(stone, depth) {
  if (depth === 0) {
    return 1;
  }
  if (stone === 0) {
    return memoizedBlink(1, depth - 1);
  }
  const stoneString = `${stone}`;
  if (stoneString.length % 2 === 0) {
    return (
      memoizedBlink(
        parseInt(stoneString.slice(0, stoneString.length / 2)),
        depth - 1
      ) +
      memoizedBlink(
        parseInt(stoneString.slice(stoneString.length / 2, stoneString.length)),
        depth - 1
      )
    );
  }
  return memoizedBlink(stone * 2024, depth - 1);
}

part1();
part2();

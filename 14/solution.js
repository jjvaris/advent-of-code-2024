import { mod, mul, readRows } from '../advent.js';

const rows = readRows('14/input.txt');
//const rows = readRows('14/test-input.txt');

function part1() {
  const width = 101;
  const height = 103;
  const robots = rows.map(parseRobotData);
  robots.forEach((robot) =>
    [...Array(100)].forEach(() => move(robot, height, width))
  );
  const quadrants = getQuadrants(robots, height, width);
  console.log('Part 1', mul(quadrants));
}

function part2() {
  const width = 101;
  const height = 103;
  const robots = rows.map(parseRobotData);
  let i = 1;
  while (true) {
    robots.forEach((robot) => move(robot, height, width));
    if (isPossiblyAChristmasTree(robots)) {
      console.log('\n');
      console.log(i);
      printMap(robots, height, width);
      console.log(i);
      console.log('\n');
    }
    i++;
  }
}

function parseRobotData(input) {
  const [[px, py], [vx, vy]] = input.split(' ').map((i) =>
    i
      .split('=')[1]
      .split(',')
      .map((i) => parseInt(i))
  );
  return { p: { x: px, y: py }, v: { x: vx, y: vy } };
}

function move(robot, height, width) {
  robot.p.x = mod(robot.p.x + robot.v.x, width);
  robot.p.y = mod(robot.p.y + robot.v.y, height);
}

function getQuadrants(robots, height, width) {
  const ul = robots.filter(
    (robot) =>
      robot.p.x >= 0 &&
      robot.p.x < Math.floor(width / 2) &&
      robot.p.y >= 0 &&
      robot.p.y < Math.floor(height / 2)
  ).length;
  const ur = robots.filter(
    (robot) =>
      robot.p.x > Math.floor(width / 2) &&
      robot.p.x < width &&
      robot.p.y >= 0 &&
      robot.p.y < Math.floor(height / 2)
  ).length;
  const dl = robots.filter(
    (robot) =>
      robot.p.x >= 0 &&
      robot.p.x < Math.floor(width / 2) &&
      robot.p.y > Math.floor(height / 2) &&
      robot.p.y < height
  ).length;
  const dr = robots.filter(
    (robot) =>
      robot.p.x > Math.floor(width / 2) &&
      robot.p.x < width &&
      robot.p.y > Math.floor(height / 2) &&
      robot.p.y < height
  ).length;

  return [ul, ur, dl, dr];
}

function isPossiblyAChristmasTree(robots) {
  return (
    new Set(robots.map((robot) => `${robot.p.x}:${robot.p.y}`)).size ===
    robots.length
  );
}

function printMap(robots, height, width) {
  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      if (robots.some((robot) => robot.p.x === x && robot.p.y === y)) {
        row += '*';
      } else {
        row += '.';
      }
    }
    console.log(row);
  }
}

part1();
part2();

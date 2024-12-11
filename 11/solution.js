// const input = '125 17';
const input = '4189 413 82070 61 655813 7478611 0 8';
const initialStones = input.split(' ').map((d) => parseInt(d));

function part1() {
  const stones = blinkFor(initialStones, 25);
  console.log(stones.length);
}

function blinkFor(stones, times) {
  let newStones = stones;
  for (let i = 0; i < times; i++) {
    newStones = blink(newStones);
  }
  return newStones;
}

function blink(stones) {
  const copy = stones.slice();
  const newStones = [];

  for (let i = 0; i < copy.length; i++) {
    const stone = copy[i];
    if (stone === 0) {
      newStones.push(1);
    } else if (`${stone}`.length % 2 === 0) {
      const stoneLength = `${stone}`.length;
      newStones.push(parseInt(`${stone}`.slice(0, stoneLength / 2)));
      newStones.push(parseInt(`${stone}`.slice(stoneLength / 2, stoneLength)));
    } else {
      newStones.push(stone * 2024);
    }
  }
  return newStones;
}

function part2() {}

part1();
part2();

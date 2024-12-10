import { readRows } from '../advent.js';

const input = readRows('9/input.txt')[0]
  .split('')
  .map((d) => parseInt(d));

// const input = readRows('9/test-input.txt')[0]
//   .split('')
//   .map((d) => parseInt(d));

const [blocks] = input.reduce(
  ([acc, currId], curr, i) => {
    if (i === input.length) {
      console.log(currId);
    }
    const isFile = i % 2 === 0;
    if (isFile) {
      [...Array(curr)].forEach(() => acc.push({ type: 'file', id: currId }));
      return [acc, currId + 1];
    } else {
      [...Array(curr)].forEach((_, i) =>
        acc.push({
          type: 'freespace',
          count: curr - i,
        })
      );

      return [acc, currId];
    }
  },
  [[], 0]
);

function part1() {
  const optimizedBlocks = blocks.slice();

  for (let tail = 0, head = optimizedBlocks.length - 1; tail < head; ) {
    if (optimizedBlocks[tail].type === 'file') {
      tail++;
      continue;
    }
    if (optimizedBlocks[head].type === 'freespace') {
      head--;
      continue;
    }
    optimizedBlocks[tail] = optimizedBlocks[head];
    optimizedBlocks[head] = { type: 'freespace' };
  }

  console.log(
    optimizedBlocks
      .filter((block) => block.type === 'file')
      .reduce((result, curr, i) => (result += i * curr.id), 0)
  );
}

function part2() {
  const optimizedBlocks = blocks
    .slice()
    .map((block, i) => ({ ...block, position: i }));

  const largestId = optimizedBlocks
    .filter((block) => block.type === 'file')
    .reduce((largestId, { id }) => (id > largestId ? id : largestId), 0);

  for (let id = largestId; id >= 0; id--) {
    const fileBlocksToMove = optimizedBlocks.filter(
      (block) => block.id === id && block.type === 'file'
    );

    const spaceRequired = fileBlocksToMove.length;

    const freeSpaceStartIndex = optimizedBlocks
      .filter((block) => block.type === 'freespace')
      .find((space) => space.count >= spaceRequired)?.position;

    if (freeSpaceStartIndex) {
      for (let i = 0; i < fileBlocksToMove.length; i++) {
        optimizedBlocks[freeSpaceStartIndex + i] = fileBlocksToMove[i];
        optimizedBlocks[fileBlocksToMove[i].position] = {
          type: 'moved-file-from-here',
        };
      }
    }
  }

  const result = optimizedBlocks.reduce((result, curr, i) => {
    if (curr.type === 'file') {
      return result + i * curr.id;
    }
    return result;
  }, 0);

  console.log(result);

  // console.log(
  //   optimizedBlocks.reduce(
  //     (acc, block) => (block.type === 'file' ? `${acc}${block.id}` : `${acc}.`),
  //     ''
  //   )
  // );
}

part1();
part2();

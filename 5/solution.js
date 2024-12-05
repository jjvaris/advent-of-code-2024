import fs from 'fs';

const input = fs.readFileSync(`5/input.txt`).toString();

const instructions = input
  .split('\n\n')[0]
  .split('\n')
  .reduce((acc, curr) => {
    const [x, y] = curr.split('|');
    acc[x] = [...(acc[x] ?? []), parseInt(y)];
    return acc;
  }, {});

const pagesToProduce = input
  .split('\n\n')[1]
  .split('\n')
  .map((row) => row.split(',').map((page) => parseInt(page)));

const [validRowsOfPages, invalidRowsOfPages] = pagesToProduce.reduce(
  (acc, pages) => {
    for (let page = 0; page < pages.length; page++) {
      const currentPageToPrint = pages[page];
      const nextPagesToPrint = pages.slice(page + 1);
      if (
        !nextPagesToPrint.every(
          (nextPage) =>
            instructions[currentPageToPrint] &&
            instructions[currentPageToPrint].includes(nextPage)
        )
      ) {
        acc[1] = [...acc[1], pages];
        return acc;
      }
    }
    acc[0] = [...acc[0], pages];
    return acc;
  },
  [[], []]
);

const printSumOfMiddlePages = (rowsOfPages) => {
  const middlePages = rowsOfPages.map(
    (pages) => pages[Math.floor(pages.length / 2)]
  );
  const sum = middlePages.reduce((sum, page) => sum + parseInt(page), 0);
  console.log(sum);
};

function part1() {
  printSumOfMiddlePages(validRowsOfPages);
}

function part2() {
  const orderPages = (pages) => {
    const copyOfPages = pages.slice().sort((a, b) => {
      if (instructions[a] && instructions[a].includes(b)) {
        return 1;
      }
      return -1;
    });
    return copyOfPages;
  };
  printSumOfMiddlePages(invalidRowsOfPages.map((pages) => orderPages(pages)));
}

part1();
part2();

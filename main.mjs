const day = process.argv[2];
const Advent = (await import(`./${day}/solution.mjs`)).default;

new Advent().executeAdvent();

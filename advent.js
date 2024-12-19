import fs from 'fs';

export const readRows = (filename) =>
  fs.readFileSync(`./${filename}`).toString().split('\n');

export const sum = (numbers) => numbers.reduce((acc, cur) => (acc += cur), 0);
export const mul = (numbers) => numbers.reduce((acc, cur) => (acc *= cur), 1);

export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

export const mod = (n, m) => ((n % m) + m) % m;

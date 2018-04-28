import fs from 'fs';
import genDiff from '../src';

const pathToResFile = '__tests__/__fixtures__/diff-output.test.res';
const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');

test('genDiff <JSON> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

test('genDiff <INI> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/after.ini';
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

test('genDiff <YAML> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/after.yml';
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

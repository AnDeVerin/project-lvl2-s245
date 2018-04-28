import fs from 'fs';
import genDiff from '../src';

test('genDiff to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/diff-output.test.res';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

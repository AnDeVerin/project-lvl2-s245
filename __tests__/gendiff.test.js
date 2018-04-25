import fs from 'fs';
import genDiff from '../src';

test('Diff to equal resBeforeAfter <JSON format>', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/beforeafter.test.res';
  const resBeforeAfter = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(resBeforeAfter);
});

test('Diff to equal resBeforeAfter <YAML format>', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/after.yml';
  const pathToResFile = '__tests__/__fixtures__/beforeafter.test.res';
  const resBeforeAfter = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(resBeforeAfter);
});

import fs from 'fs';
import genDiff from '../src';

test('json: genDiff <JSON> to equal result from "diff-ast.test.res.json" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/diff-ast.test.res.json';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'json');
  const jsonFromFile = JSON.parse(diffFromFile);
  const jsonFromDiff = JSON.parse(diff);
  expect(jsonFromDiff).toEqual(jsonFromFile);
});

test('plain: genDiff <JSON> to equal result from "diff-plain-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/diff-plain-output.test.res';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'plain');
  expect(diff).toBe(diffFromFile);
});

test('rich: genDiff <JSON> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/diff-output.test.res';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

test('rich: genDiff <INI> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/after.ini';
  const pathToResFile = '__tests__/__fixtures__/diff-output.test.res';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

test('rich: genDiff <YAML> to equal result from "diff-output.test.res" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/after.yml';
  const pathToResFile = '__tests__/__fixtures__/diff-output.test.res';
  const diffFromFile = fs.readFileSync(pathToResFile, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(diffFromFile);
});

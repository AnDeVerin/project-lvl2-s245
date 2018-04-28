import fs from 'fs';
import buildDiff from '../src/diff-builder';

test('buildDiff to equal result from "diff-ast.test.res.json" file', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const pathToResFile = '__tests__/__fixtures__/diff-ast.test.res.json';

  const fileContent1 = fs.readFileSync(pathToFile1, 'utf8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf8');
  const resContent = fs.readFileSync(pathToResFile, 'utf8');

  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);
  const resDiff = JSON.parse(resContent);

  const diff = buildDiff(obj1, obj2);
  expect(diff).toEqual(resDiff);
});

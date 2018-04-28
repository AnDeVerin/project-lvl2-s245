import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildDiff from './diff-builder';
import renderDiff from './render';

export default (source1, source2) => {
  const fileContent1 = fs.readFileSync(source1, 'utf8');
  const fileContent2 = fs.readFileSync(source2, 'utf8');
  const ext = path.extname(source1);
  const parse = getParser(ext);

  const obj1 = parse(fileContent1);
  const obj2 = parse(fileContent2);

  const astDiff = buildDiff(obj1, obj2);
  const renderedDiff = renderDiff(astDiff);
  return renderedDiff;
};

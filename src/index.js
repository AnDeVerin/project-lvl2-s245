import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

export default (source1, source2) => {
  const fileContent1 = fs.readFileSync(source1, 'utf8');
  const fileContent2 = fs.readFileSync(source2, 'utf8');

  const ext = path.extname(source1);
  const parse = getParser(ext);

  const obj1 = parse(fileContent1);
  const obj2 = parse(fileContent2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const resultBuilder = (acc, key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);

    if (obj1[key] === obj2[key]) return [...acc, `  ${key}: ${obj1[key]}`];

    if (inObj1 && inObj2) return [...acc, [`+ ${key}: ${obj2[key]}`, `- ${key}: ${obj1[key]}`]];

    if (inObj1) return [...acc, `- ${key}: ${obj1[key]}`];

    return [...acc, `+ ${key}: ${obj2[key]}`];
  };

  const resultList = _.flatten(keys.reduce(resultBuilder, []));

  return `{\n  ${resultList.join('\n  ')}\n}`;
};

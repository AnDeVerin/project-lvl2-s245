import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

export default (source1, source2) => {
  const fileContent1 = fs.readFileSync(source1, 'utf8');
  const fileContent2 = fs.readFileSync(source2, 'utf8');

  const ext1 = path.extname(source1);
  const parse1 = getParser(ext1);

  // можно использовать разные форматы файлов, получая отдельный парсер для каждого файла
  //  const ext2 = path.extname(source2);
  //  const parse2 = getParser(ext2);

  const obj1 = parse1(fileContent1);
  const obj2 = parse1(fileContent2);
  const allKeys = Object.keys({ ...obj1, ...obj2 });

  const resultBuilder = (acc, key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);
    let currentKeyRes;

    if (obj1[key] === obj2[key]) {
      currentKeyRes = `  ${key}: ${obj1[key]}`;
    } else if (inObj1 && inObj2) {
      currentKeyRes = `+ ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    } else if (inObj1) {
      currentKeyRes = `- ${key}: ${obj1[key]}`;
    } else {
      currentKeyRes = `+ ${key}: ${obj2[key]}`;
    }
    return `${acc}\n  ${currentKeyRes}`;
  };

  return `{${allKeys.reduce(resultBuilder, '')}\n}`;
};

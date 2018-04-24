import fs from 'fs';
import _ from 'lodash';

export default (source1, source2) => {
  const fileContent1 = fs.readFileSync(source1, 'utf8');
  const fileContent2 = fs.readFileSync(source2, 'utf8');
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);
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

import * as fs from 'fs';
import _ from 'lodash';

export default (source1, source2) => {
  const fileContent1 = fs.readFileSync(source1, 'utf8');
  const fileContent2 = fs.readFileSync(source2, 'utf8');
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);
  const resultKeys = Object.keys({ ...obj1, ...obj2 });

  const resultBuilder = (acc, key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);
    if (obj1[key] === obj2[key]) {
      return `${acc}\n    ${key}: ${obj1[key]}`;
    }
    if (inObj1 && inObj2) {
      return `${acc}\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    } else if (inObj1) {
      return `${acc}\n  - ${key}: ${obj1[key]}`;
    }
    return `${acc}\n  + ${key}: ${obj2[key]}`;
  };

  const resultString = `{${resultKeys.reduce(resultBuilder, '')}\n}`;
  // console.log(obj1);
  // console.log(obj2);
  // console.log(resultString);
  return resultString;
};

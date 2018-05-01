import _ from 'lodash';

const keyTypes = [
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)
    && _.isObject(obj1[key]) && _.isObject(obj2[key])),
    process: (obj1, obj2, key, f) => ({ name: key, type: 'nested', children: f(obj1[key], obj2[key]) }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]),
    process: (obj1, obj2, key) => ({ name: key, type: 'unchanged', value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]),
    process: (obj1, obj2, key) => ({
      name: key,
      type: 'updated',
      oldValue: obj1[key],
      newValue: obj2[key],
    }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key),
    process: (obj1, obj2, key) => ({ name: key, type: 'removed', value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj2, key),
    process: (obj1, obj2, key) => ({ name: key, type: 'added', value: obj2[key] }),
  },
];

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const { process } = _.find(keyTypes, item => item.check(obj1, obj2, key));
    return process(obj1, obj2, key, buildDiff);
  });
};

export default buildDiff;

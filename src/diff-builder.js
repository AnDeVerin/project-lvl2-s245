import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const resultList = keys.map((key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (inObj1 && inObj2) {
      if (_.isObject(val1) && _.isObject(val2)) {
        return {
          name: key,
          type: 'nested',
          children: buildDiff(obj1[key], obj2[key]),
        };
      }
      if (val1 === val2) {
        return {
          name: key,
          type: 'unchanged',
          value: val1,
        };
      }
      return {
        name: key,
        type: 'updated',
        oldValue: val1,
        newValue: val2,
      };
    }

    if (inObj1) {
      return {
        name: key,
        type: 'removed',
        value: val1,
      };
    }

    return {
      name: key,
      type: 'added',
      value: val2,
    };
  });

  return resultList;
};

export default buildDiff;

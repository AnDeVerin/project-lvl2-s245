import _ from 'lodash';

const buildUnchangedObj = (obj) => {
  const keys = _.keys(obj);
  return keys.map((key) => {
    if (_.isObject(key)) {
      return {
        name: key,
        type: 'object',
        status: '=',
        value: '',
        children: buildUnchangedObj(obj[key]),
      };
    }
    return {
      name: key,
      type: 'value',
      status: '=',
      value: obj[key],
      children: [],
    };
  });
};

const diffBuilder = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const resultList = _.flatten(keys.map((key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (inObj1 && inObj2) {
      if (_.isObject(val1) && _.isObject(val2)) {
        return {
          name: key,
          type: 'object',
          status: '=',
          value: '',
          children: diffBuilder(obj1[key], obj2[key]),
        };
      }
      if (_.isObject(val1)) {
        return [{
          name: key,
          type: 'object',
          status: '-',
          value: '',
          children: buildUnchangedObj(val1),
        },
        {
          name: key,
          type: 'value',
          status: '+',
          value: val2,
          children: [],
        }];
      }
      if (_.isObject(val2)) {
        return [{
          name: key,
          type: 'value',
          status: '-',
          value: val1,
          children: [],
        },
        {
          name: key,
          type: 'object',
          status: '+',
          value: '',
          children: buildUnchangedObj(val2),
        }];
      }
      if (val1 === val2) {
        return {
          name: key,
          type: 'value',
          status: '=',
          value: val1,
          children: [],
        };
      }
      if (val1 !== val2) {
        return [{
          name: key,
          type: 'value',
          status: '-',
          value: val1,
          children: [],
        },
        {
          name: key,
          type: 'value',
          status: '+',
          value: val2,
          children: [],
        }];
      }
    }

    if (inObj1) {
      if (_.isObject(val1)) {
        return {
          name: key,
          type: 'object',
          status: '-',
          value: '',
          children: buildUnchangedObj(val1),
        };
      }
      return {
        name: key,
        type: 'value',
        status: '-',
        value: val1,
        children: [],
      };
    }

    if (inObj2) {
      if (_.isObject(val2)) {
        return {
          name: key,
          type: 'object',
          status: '+',
          value: '',
          children: buildUnchangedObj(val2),
        };
      }
      return {
        name: key,
        type: 'value',
        status: '+',
        value: val2,
        children: [],
      };
    }
  }));

  return resultList;
};

export default (obj1, obj2) => {
  const result = diffBuilder(obj1, obj2);
  return result;
};

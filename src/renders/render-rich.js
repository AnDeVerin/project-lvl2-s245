import _ from 'lodash';

const stringify = (val, n) => {
  if (_.isObject(val)) {
    const renderedKeys = _.keys(val).map(key => `${' '.repeat(n + 6)}${key}: ${val[key]}`);
    return `{\n${renderedKeys.join('\n')}\n${' '.repeat(n + 2)}}`;
  }
  return val;
};

export default (astDiff) => {
  const renderDiff = (elem, spaceNum) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = elem;

    const openIndent = ' '.repeat(spaceNum);
    const closeIndent = ' '.repeat(spaceNum + 2);

    const keyTypes = [
      {
        type: 'added',
        process: () => `${openIndent}+ ${name}: ${stringify(value, spaceNum)}`,
      },
      {
        type: 'removed',
        process: () => `${openIndent}- ${name}: ${stringify(value, spaceNum)}`,
      },
      {
        type: 'updated',
        process: () => [`${openIndent}- ${name}: ${stringify(oldValue, spaceNum)}`,
          `${openIndent}+ ${name}: ${stringify(newValue, spaceNum)}`],
      },
      {
        type: 'nested',
        process: () => `${openIndent}  ${name}: {\n${_.flatten(children.map(child =>
          renderDiff(child, spaceNum + 4))).join('\n')}\n${closeIndent}}`,
      },
      {
        type: 'unchanged',
        process: () => `${openIndent}  ${name}: ${stringify(value, spaceNum)}`,
      },
    ];

    const { process } = _.find(keyTypes, item => item.type === type);
    return process();
  };

  const renderedList = astDiff.map(node => renderDiff(node, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

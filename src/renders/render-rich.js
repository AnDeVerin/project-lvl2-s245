import _ from 'lodash';

const status = {
  unchanged: '  ',
  removed: '- ',
  added: '+ ',
};

const stringify = (val, n) => {
  if (val instanceof Object) {
    const keys = _.keys(val);
    const renderedKeys = keys.map(key => `${' '.repeat(n + 6)}${key}: ${val[key]}`);
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
    const statusLine = (type) ? status[type] : '';

    const processElem = {
      added: () => `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`,
      removed: () => `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`,

      updated: () => [`${openIndent}${status.removed}${name}: ${stringify(oldValue, spaceNum)}`,
        `${openIndent}${status.added}${name}: ${stringify(newValue, spaceNum)}`],

      nested: () => `${openIndent}  ${name}: {\n${_.flatten(children.map(child =>
        renderDiff(child, spaceNum + 4))).join('\n')}\n${closeIndent}}`,

      unchanged: () => `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`,
    };
    return processElem[type]();
  };
  const renderedList = astDiff.map(obj => renderDiff(obj, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

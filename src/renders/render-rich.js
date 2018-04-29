import _ from 'lodash';

const status = {
  unchanged: '  ',
  removed: '- ',
  added: '+ ',
};

// вынес функцию
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

    if (type === 'nested') {
      const renderedCildren = _.flatten(children.map(child => renderDiff(child, spaceNum + 4)));
      return `${openIndent}  ${name}: {\n${renderedCildren.join('\n')}\n${closeIndent}}`;
    }

    if (type === 'updated') {
      return [`${openIndent}${status.removed}${name}: ${stringify(oldValue, spaceNum)}`,
        `${openIndent}${status.added}${name}: ${stringify(newValue, spaceNum)}`];
    }

    if (type === 'added') {
      return `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`;
    }

    if (type === 'removed') {
      return `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`;
    }

    // if (type === 'unchanged') - закомментировал, чтобы eslint не ругался,
    // что нет безусловного return
    return `${openIndent}${statusLine}${name}: ${stringify(value, spaceNum)}`;
  };
  const renderedList = astDiff.map(obj => renderDiff(obj, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

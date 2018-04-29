import _ from 'lodash';

const status = {
  unchanged: '  ',
  removed: '- ',
  added: '+ ',
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
    const stringify = (val) => {
      if (val instanceof Object) {
        const keys = _.keys(val);
        const renderedKeys = keys.map(key => `${' '.repeat(spaceNum + 6)}${key}: ${val[key]}`);
        return `{\n${renderedKeys.join('\n')}\n${' '.repeat(spaceNum + 2)}}`;
      }
      return val;
    };

    if (type === 'nested') {
      const renderedCildren = _.flatten(children.map(child => renderDiff(child, spaceNum + 4)));
      return `${openIndent}  ${name}: {\n${renderedCildren.join('\n')}\n${closeIndent}}`;
    }

    if (type === 'updated') {
      return [`${openIndent}${status.removed}${name}: ${stringify(oldValue)}`,
        `${openIndent}${status.added}${name}: ${stringify(newValue)}`];
    }

    return `${openIndent}${statusLine}${name}: ${stringify(value)}`;
  };
  const renderedList = astDiff.map(obj => renderDiff(obj, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

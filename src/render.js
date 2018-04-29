import _ from 'lodash';

export default (astDiff) => {
  const renderDiff = (elem, spaceNum) => {
    const {
      name,
      type,
      oldValue,
      newValue,
      children,
    } = elem;
    const openIndent = ' '.repeat(spaceNum);
    const closeIndent = ' '.repeat(spaceNum + 2);
    const stringify = (val) => {
      if (val instanceof Object) {
        const keys = _.keys(val);
        const renderedKeys = keys.map(key => `${' '.repeat(spaceNum + 6)}${key}: ${val[key]}`);
        return `{\n${renderedKeys.join('\n')}\n${' '.repeat(spaceNum + 2)}}`;
      }
      return val;
    };

    if (children) {
      const renderedCildren = _.flatten(children.map(child => renderDiff(child, spaceNum + 4)));
      return `${openIndent}  ${name}: {\n${renderedCildren.join('\n')}\n${closeIndent}}`;
    }

    switch (type) {
      case 'unchanged':
        return `${openIndent}  ${name}: ${stringify(oldValue)}`;
      case 'removed':
        return `${openIndent}- ${name}: ${stringify(oldValue)}`;
      case 'added':
        return `${openIndent}+ ${name}: ${stringify(newValue)}`;
      default:
        return [`${openIndent}- ${name}: ${stringify(oldValue)}`,
          `${openIndent}+ ${name}: ${stringify(newValue)}`];
    }
  };
  const renderedList = astDiff.map(obj => renderDiff(obj, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

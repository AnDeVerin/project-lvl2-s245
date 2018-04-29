import _ from 'lodash';

export default (astDiff) => {
  const renderDiff = (elem, prefix) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = elem;

    const newName = (prefix) ? `${prefix}.${name}` : name;

    const stringifyAdded = (val) => {
      if (_.isObject(val)) return 'complex value';
      return `value: '${val}'`;
    };
    const stringifyUpd = (val) => {
      if (_.isObject(val)) return 'complex value';
      return `'${val}'`;
    };

    if (type === 'nested') {
      const changedChildren = children.filter(node => node.type !== 'unchanged');
      return `${_.flatten(changedChildren.map(child => renderDiff(child, newName))).join('\n')}`;
    }

    const processElem = {
      added: `Property '${newName}' was added with ${stringifyAdded(value)}`,
      removed: `Property '${newName}' was removed`,
      updated: `Property '${newName}' was updated. From ${stringifyUpd(oldValue)} to ${stringifyUpd(newValue)}`,
    };
    return processElem[type];
  };

  const changedNodes = astDiff.filter(node => node.type !== 'unchanged');
  const renderedList = changedNodes.map(obj => renderDiff(obj, ''));
  return `${renderedList.join('\n')}`;
};

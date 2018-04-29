import _ from 'lodash';

const stringifyAdded = (val) => {
  if (_.isObject(val)) return 'complex value';
  return `value: '${val}'`;
};

const stringifyUpd = (val) => {
  if (_.isObject(val)) return 'complex value';
  return `'${val}'`;
};

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

    const processElem = {
      added: () => `Property '${newName}' was added with ${stringifyAdded(value)}`,
      removed: () => `Property '${newName}' was removed`,
      updated: () => `Property '${newName}' was updated. From ${stringifyUpd(oldValue)} to ${stringifyUpd(newValue)}`,
      nested: () => `${_.flatten(children.filter(node => node.type !== 'unchanged').map(child => renderDiff(child, newName))).join('\n')}`,
    };
    return processElem[type]();
  };

  const changedNodes = astDiff.filter(node => node.type !== 'unchanged');
  const renderedList = changedNodes.map(obj => renderDiff(obj, ''));
  return `${renderedList.join('\n')}`;
};

import _ from 'lodash';

const stringifyAdded = (val) => {
  if (_.isObject(val)) return 'complex value';
  return `value: '${val}'`;
};

const stringifyUpd = (val) => {
  if (_.isObject(val)) return 'complex value';
  return `'${val}'`;
};

const changedItem = node => node.type !== 'unchanged';

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
      nested: () => `${_.flatten(children.filter(changedItem).map(child => renderDiff(child, newName))).join('\n')}`,
    };
    return processElem[type]();
  };

  const changedNodes = astDiff.filter(changedItem);
  const renderedList = changedNodes.map(node => renderDiff(node, ''));
  return `${renderedList.join('\n')}`;
};

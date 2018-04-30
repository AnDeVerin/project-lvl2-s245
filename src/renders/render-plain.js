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

    const keyTypes = [
      {
        type: 'added',
        process: () => `Property '${newName}' was added with ${stringifyAdded(value)}`,
      },
      {
        type: 'removed',
        process: () => `Property '${newName}' was removed`,
      },
      {
        type: 'updated',
        process: () => `Property '${newName}' was updated. From ${stringifyUpd(oldValue)} to ${stringifyUpd(newValue)}`,
      },
      {
        type: 'nested',
        process: () => `${_.flatten(children.filter(changedItem).map(child => renderDiff(child, newName))).join('\n')}`,
      },
    ];

    const { process } = _.find(keyTypes, item => item.type === type);
    return process();
  };

  const changedNodes = astDiff.filter(changedItem);
  const renderedList = changedNodes.map(node => renderDiff(node, ''));
  return `${renderedList.join('\n')}`;
};

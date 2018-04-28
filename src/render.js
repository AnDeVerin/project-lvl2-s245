const sign = {
  '=': ' ',
  '+': '+',
  '-': '-',
};

export default (astDiff) => {
  const renderDiff = (elem, spaceNum) => {
    const {
      name,
      type,
      status,
      value,
      children,
    } = elem;
    const openIndent = ' '.repeat(spaceNum);
    const closeIndent = ' '.repeat(spaceNum + 2);
    const statusLine = `${sign[status]} `;

    if (type === 'object') {
      const renderedCildren = children.map(child => renderDiff(child, spaceNum + 4));
      return `${openIndent}${statusLine}${name}: {\n${renderedCildren.join('\n')}\n${closeIndent}}`;
    }
    return `${openIndent}${statusLine}${name}: ${value}`;
  };
  const renderedList = astDiff.map(obj => renderDiff(obj, 2));
  return `{\n${renderedList.join('\n')}\n}`;
};

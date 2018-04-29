import renderRichFormat from './render-rich';
import renderPlainFormat from './render-plain';

const render = {
  rich: renderRichFormat,
  plain: renderPlainFormat,
};

export default (astData, format = 'rich') => {
  return render[format](astData);
};

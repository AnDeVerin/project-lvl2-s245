import renderRichFormat from './render-rich';
import renderPlainFormat from './render-plain';
import renderJsonFormat from './render-json';

const render = {
  rich: renderRichFormat,
  plain: renderPlainFormat,
  json: renderJsonFormat,
};

export default (astData, format = 'rich') => render[format](astData);

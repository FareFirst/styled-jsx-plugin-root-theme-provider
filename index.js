const loopWhile = require('deasync').loopWhile
const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')
const { addTheme, removeTheme } = require('./theme-processor')

module.exports = (css, options) => {
  options = options || {}

  const cssWithPlaceholders = css
    .replace(/%%styled-jsx-placeholder-(\d+)%%/g, (_, id) =>
      `/*%%styled-jsx-placeholder-${id}%%*/`
    )

  const cssToBeProcessed = addTheme(cssWithPlaceholders, options);

  let processedCss
  let wait = true

  function resolved(result) {
    processedCss = result
    wait = false
  }

  const postcssPresetEnvOptions = options.postcssPresetEnvOptions || {};

  postcss([
    postcssPresetEnv(Object.assign({}, { stage: 0 }, postcssPresetEnvOptions))
  ]).process(cssToBeProcessed, { from: false })
    .then(result => result.css)
    .then(resolved)
    .catch(resolved)
  loopWhile(() => wait)

  if (processedCss instanceof Error || processedCss.name === 'CssSyntaxError') {
    throw processedCss
  }

  const result = removeTheme(processedCss)
    .replace(/\/\*%%styled-jsx-placeholder-(\d+)%%\*\//g, (_, id) =>
      `%%styled-jsx-placeholder-${id}%%`
    );

  if (options.enableLog) {
    console.log('START', css, '-------------', result, 'END');
  }

  return result;
}

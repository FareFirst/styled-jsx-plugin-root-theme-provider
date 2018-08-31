const loopWhile = require('deasync').loopWhile
const postcssPresetEnv = require('postcss-preset-env')
const themeProcessor = require('./theme-processor')

module.exports = (css, options) => {
  options = options || {}

  const cssWithPlaceholders = css
    .replace(/%%styled-jsx-placeholder-(\d+)%%/g, (_, id) =>
      `/*%%styled-jsx-placeholder-${id}%%*/`
    )

  const {
    namespacedTheme,
    cssToBeProcessed
  } = themeProcessor(cssWithPlaceholders, options);

  let processedCss
  let wait = true

  function resolved(result) {
    processedCss = result
    wait = false
  }

  postcssPresetEnv.process(cssToBeProcessed, { from: undefined })
    .then(result => result.css)
    .then(resolved)
    .catch(resolved)
  loopWhile(() => wait)

  if (processedCss instanceof Error || processedCss.name === 'CssSyntaxError') {
    throw processedCss
  }

  return processedCss
    .replace(namespacedTheme, '')
    .replace(/\/\*%%styled-jsx-placeholder-(\d+)%%\*\//g, (_, id) =>
      `%%styled-jsx-placeholder-${id}%%`
    )
}

const loopWhile = require('deasync').loopWhile
const fs = require('fs')

const NAMESPACE = '/* ##styled-jsx-plugin-ff-theme## */'
const NAMESPACE_REGEX = /\/\* ##styled-jsx-plugin-ff-theme## \*\/[^]*\/\* ##styled-jsx-plugin-ff-theme## \*\//

const addTheme = (css, options) => {
  const { themeFilePath } = options
  if (!themeFilePath) return css;

  let theme
  let wait = true

  function resolved(result) {
    theme = result
    wait = false
  }

  fs.readFile(themeFilePath, (err, data) => {
    if (err) throw err;
    resolved(data.toString());
  });
  loopWhile(() => wait)

  const cssToBeProcessed = `${NAMESPACE}${theme}${NAMESPACE}${css}`
  return cssToBeProcessed;
}

const removeTheme = css => css.replace(NAMESPACE_REGEX, '');

module.exports = {
  addTheme,
  removeTheme
}

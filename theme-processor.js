const loopWhile = require('deasync').loopWhile
const fs = require('fs')

module.exports = (css, options) => {
  const NAMESPACE = '/* ##styled-jsx-plugin-ff-theme## */'

  const { themeFilePath } = options
  if (!themeFilePath) return {
    namespacedTheme: NAMESPACE,
    cssToBeProcessed: `${NAMESPACE}${css}`
  }

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

  const namespacedTheme = `${NAMESPACE}${theme}${NAMESPACE}`
  const cssToBeProcessed = `${namespacedTheme}${css}`
  return {
    namespacedTheme,
    cssToBeProcessed
  }
}

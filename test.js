const assert = require('assert')
const plugin = require('./')

describe('styled-jsx-plugin-root-theme-provider', () => {
  it('applies plugins', () => {
    assert.equal(
      plugin('.selector {background: var(--red)}'),
      '.selector {background: var(--red);background: var(--red)}'
    )
  })

  it('applies theme', () => {
    assert.equal(
      plugin('.selector {background: var(--red)}', { themeFilePath: './fixture-theme.css' }),
      '.selector {background: red;background: var(--red)}'
    )
  })
})

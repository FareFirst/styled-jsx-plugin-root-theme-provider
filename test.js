const assert = require('assert')
const plugin = require('./')

describe('styled-jsx-plugin-root-theme-provider', () => {
  it('applies plugins', () => {
    assert.equal(
      plugin('.selector {background: var(--red);}'),
      '.selector {background: var(--red);background: var(--red);}'
    )
  })

  it('applies theme', () => {
    assert.equal(
      plugin('.selector {background: var(--red);}', { themeFilePath: './fixture-theme.css' }),
      '.selector {background: red;background: var(--red);}'
    )
  })

  it('applies postcss-custom-media', () => {
    assert.equal(
      plugin('@media (--small-viewport) {b {font-size: 1em;}}', { themeFilePath: './fixture-theme.css' }),
      '@media (max-width: 30em) {b {font-size: 1em;}}'
    )
  })

  it('applies color-mod', () => {
    assert.equal(
      plugin('b { color: color-mod(black a(90%));}'),
      'b { color: rgba(0, 0, 0, 0.9);}'
    )
  })

  it('applies postcssPresetEnvOptions', () => {
    assert.equal(
      plugin('@media (--small-viewport) {b {font-size: 1em;}}', {
        themeFilePath: './fixture-theme.css',
        postcssPresetEnvOptions: {
          stage: 2
        }
      }),
      '@media (--small-viewport) {b {font-size: 1em;}}'
    )
  })
})

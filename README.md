# styled-jsx-plugin-root-theme-provider

[![Build Status](https://travis-ci.org/FareFirst/styled-jsx-plugin-root-theme-provider.svg?branch=master)](https://travis-ci.org/nawaf331/styled-jsx-plugin-root-theme-provider)
[![npm](https://img.shields.io/npm/v/styled-jsx-plugin-root-theme-provider.svg)](https://www.npmjs.com/package/styled-jsx-plugin-root-theme-provider)


Plugin to use `var` and `:root` css power to build themed [styled-jsx](https://github.com/zeit/styled-jsx) with older browser support. Under the hood it uses **postcss-preset-env**, so it will also enable latest css features.

## Install

```bash
npm install --save styled-jsx-plugin-root-theme-provider
```

Next, add `styled-jsx-plugin-root-theme-provider` to the `styled-jsx`'s `plugins` in your
babel configuration:

```json
{
  "plugins": [
    [
      "styled-jsx/babel",
      {
        "plugins": [
          [
            "styled-jsx-plugin-root-theme-provider",
            {
              "themeFilePath": "./theme.css"
            }
          ]
        ]
      }
    ]
  ]
}
```

**For Next.js**

```json
{
  "presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": [
            [
              "styled-jsx-plugin-root-theme-provider",
              {
                "themeFilePath": "./theme.css"
              }
            ]
          ]
        }
      }
    ]
  ]
}

```

## Usage

Create a css file

./theme.css
```css
:root {
  --red: red,
  --blue: #000032;
}
```

Configure this file as theme file in .bablerc using `themeFilePath` option

**Make sure ./theme.css is part of your global css**

Now in your styled-jsx use any `var` or latest css feature supported by **postcss-preset-env**.

```html
<style jsx>
.a {
  background: var(--red);
}
</style>

```

In browser this css will be translated to

```css
.a {
  background: red;
  background: var(--red);
}
```

#### Notes

[styled-jsx-plugin-root-theme-provider](https://github.com/nawaf331/styled-jsx-plugin-root-theme-provider) uses [styled-jsx](https://github.com/zeit/styled-jsx#css-preprocessing-via-plugins)'s plugin system which is supported from version 2. Read more on their repository for further info.


## Contributing

PR's are welcome!

Thanks to all [the contributors](https://github.com/nawaf331/styled-jsx-plugin-root-theme-provider/graphs/contributors)!

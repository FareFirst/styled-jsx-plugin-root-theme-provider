# styled-jsx-plugin-root-theme-provider

[![Build Status](https://travis-ci.org/nawaf331/styled-jsx-plugin-root-theme-provider.svg?branch=master)](https://travis-ci.org/nawaf331/styled-jsx-plugin-root-theme-provider)
[![npm](https://img.shields.io/npm/v/styled-jsx-plugin-root-theme-provider.svg)](https://www.npmjs.com/package/styled-jsx-plugin-root-theme-provider)

Use [PostCSS](https://github.com/postcss/postcss) with
[styled-jsx](https://github.com/zeit/styled-jsx) 💥

## Usage

Plug-in to use `:root` selector power to build themed Styled-JSX. It Alos enable latest css feature

Create a css file with (Also make sure to add this css to your global css)
```css
:root {
  --red: red,
  --blue: #000032;
}
```

Configure this file as theme file in .bablerc

Now use any latest css feature in your styled-jsx (It uses postcss/precss under the hood)
```css
.a {
  background: var(--red);
}

```

Install the package first.

```bash
npm install --save styled-jsx-plugin-root-theme-provider
```

Next, add `styled-jsx-plugin-root-theme-provider` to the `styled-jsx`'s `plugins` in your
babel configuration:

```json
{
  "plugins": [
    ["styled-jsx/babel", { "plugins": ["styled-jsx-plugin-root-theme-provider", {"themeFilePath": "./assets/theme.css"}]}]
  ]
}
```

#### Notes

`styled-jsx-plugin-root-theme-provider` uses `styled-jsx`'s plugin system which is supported
from version 2. Read more on their repository for further info.

## License

MIT

import { createGlobalStyle } from 'styled-components'
import { themeVariables } from './Theme'

export const Global = createGlobalStyle`
html {
  font-size: 15px;
}

body {
  font-family: ${themeVariables.font.family.serif};
}

h1,
h2,
h3,
h4,
h5 {
  font-family: ${themeVariables.font.family.serif};
}

h1 {
    font-size: ${themeVariables.font.size.huge};
}

h2 {
    font-size: ${themeVariables.font.size.large};
}

h3 {
    font-size: ${themeVariables.font.size.medium};
}

p,li {
    line-height: 1.67;
}

/* END */
`


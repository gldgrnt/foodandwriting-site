import { createGlobalStyle } from 'styled-components'
import { variables } from './Theme'

export const Global = createGlobalStyle`
html {
  font-size: 15px;
}

body {
  font-family: ${variables.font.family.serif};
}

h1,
h2,
h3,
h4,
h5 {
  font-family: ${variables.font.family.serif};
}

h1 {
    font-size: ${variables.font.size.huge};
}

h2 {
    font-size: ${variables.font.size.large};
}

p,li {
    line-height: 1.67;
}

/* END */
`


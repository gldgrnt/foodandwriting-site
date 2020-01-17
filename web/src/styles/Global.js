import { createGlobalStyle } from 'styled-components'
import { variables } from './Theme'

export const Global = createGlobalStyle`
html {
  font-size: 16px;
}

body {
  font-family: ${variables.font.family.sans};
}

h1,
h2,
h3,
h4,
h5 {
  font-family: ${variables.font.family.serif};
}
`;
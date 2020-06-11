import { createGlobalStyle } from 'styled-components'
import { themeVariables } from './Theme'

export const Global = createGlobalStyle`
html {
    font-size: 15px;
}

@media screen and (max-width: 768) {
    html.menu-open {
        height: 100%;
        position: fixed;
        width: 100%;
    }    
}

body {
    color: ${themeVariables.color.black};
    font-family: ${themeVariables.font.family.serif};
}

#gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
        flex-grow: 1;
    }
}

h1,
h2,
h3,
h4,
h5 {
    font-family: ${themeVariables.font.family.serif};
    line-height: ${themeVariables.font.lineHeight.header};
}

h1 {
    font-size: ${themeVariables.font.size.giant};
}

h2 {
    font-size: ${themeVariables.font.size.huge};
}

h3 {
    font-size: ${themeVariables.font.size.large};
}

p,li {
    line-height: ${themeVariables.font.lineHeight.paragraph};
}

/* END */
`


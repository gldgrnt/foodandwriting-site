import { themeVariables } from '../styles'

// Responsive breakpoint down
export const responsiveBreakpointDown = (breakpointName, styles) => {
    let maxWidth = null
    // Try to get breakpoint value
    try {
        maxWidth = getBreakpoint(breakpointName).maxScreenWidth
    }
    catch (error) {
        console.log(error)
    }

    return `
        @media screen and (max-width: ${maxWidth}px) {
            ${styles}
        };
    `
}

/* Get breakpoint variables from variables */
const getBreakpoint = (breakpointName) => {
    return themeVariables.grid.breakpoints[breakpointName]
}
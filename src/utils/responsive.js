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

export const responsiveStylesFromProp = (valueOrBreakpoint, styleName) => {
    let styles = ''

    switch (typeof valueOrBreakpoint) {

        case 'string': {
            styles += `${styleName}: ${valueOrBreakpoint};`
            break
        }

        case 'object': {
            for (const breakpointName in valueOrBreakpoint) {
                styles += responsiveBreakpointDown(breakpointName,
                    `${styleName}: ${valueOrBreakpoint[breakpointName]};`
                )
            }
            break
        }

        default:
            return
    }

    return styles
}

/* Get breakpoint variables from variables */
const getBreakpoint = (breakpointName) => {
    return themeVariables.grid.breakpoints[breakpointName]
}


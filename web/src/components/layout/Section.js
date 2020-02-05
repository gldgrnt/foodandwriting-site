import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { responsiveBreakpointDown } from '../../utils'
import { themeVariables } from '../../styles'

export const Section = ({ children, spacingTop = "0", spacingBottom = "0", ...props }) => {

    return (
        <StyledSection
            spacingTop={makeStyles(spacingTop, 'padding-top')}
            spacingBottom={makeStyles(spacingBottom, 'padding-bottom')} {...props}>
            {children}
        </StyledSection>
    )
}

Section.prototypes = {
    children: PropTypes.node.isRequired,
    spacingTop: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    spacingBottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

const StyledSection = styled.section`
    ${props => props.spacingTop}
    ${props => props.spacingBottom}
    background: ${props => props.whiteGrey ? props.theme.color.whiteGrey : 'white'};
`

const makeStyles = (value, styleName) => {
    let styles = ''
    const spacing = themeVariables.grid.spacing

    switch (typeof value) {

        case 'string': {
            styles += `${styleName}: ${parseInt(value) * spacing}px;`
            break
        }

        case 'object': {
            for (const breakpointName in value) {
                styles += responsiveBreakpointDown(breakpointName,
                    `${styleName}: ${parseInt(value[breakpointName]) * spacing}px;`
                )
            }
            break
        }

        default:
            return
    }

    return styles
}
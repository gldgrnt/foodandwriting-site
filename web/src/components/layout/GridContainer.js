import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { responsiveBreakpointDown } from '../../utils'

/* CONTAINER */
export const GridContainer = ({ children, removeMobilePadding = false, ...props }) => (
    <StyledContainer removeMobilePadding={removeMobilePadding} {...props}>{children}</StyledContainer>
)

GridContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    margin: auto;
    padding-left: ${props => props.theme.grid.spacing}px;
    padding-right: ${props => props.theme.grid.spacing}px;
    flex-wrap: ${props => props.wrap || 'no-wrap'};
    justify-content: ${props => props.justify || 'unset'};
    align-items: ${props => props.align || 'unset'};
    
    ${props => props.removeMobilePadding && responsiveBreakpointDown('mobile', `
        padding: 0;
    `)}

    /* Breakpoint sizes */
    ${props => createGridBreakpoints(props.theme.grid.breakpoints, props.theme.grid.spacing)}
`

const createGridBreakpoints = (breakpoints, spacing) => {
    let styles = ''

    for (const size in breakpoints) {
        styles += `
            @media screen and (max-width: ${breakpoints[size].maxScreenWidth + 'px' || 'none'}) {
                max-width: ${breakpoints[size].minScreenWidth + 'px' || (breakpoints[size].minScreenWidth + (spacing * 2))};
            }
        `
    }

    return styles
}

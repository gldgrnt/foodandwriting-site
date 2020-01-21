import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/* CONTAINER */
export const GridContainer = ({ children }) => (
    <StyledContainer>{children}</StyledContainer>
)

GridContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

const createGridBreakpoints = (breakpoints, spacing) => {
    let styles = ''

    breakpoints.forEach((breakpoint, index) => {
        styles += `
            @media screen and (max-width: ${index === 0 ? '10000' : breakpoints[index - 1] - 0.00001}px) {
                max-width: ${index !== breakpoints.length - 1 ? (breakpoint - (spacing * 2)) + 'px' : 'none'}
            }
        `
    })

    return styles
}

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    margin: auto;
    padding-left: ${props => props.theme.grid.spacing}px;
    padding-right: ${props => props.theme.grid.spacing}px;
    flex-wrap: wrap;
    justify-content: ${props => props.justify || 'unset'};
    align-items: ${props => props.align || 'unset'};
    
    /* Breakpoint sizes */
    ${props => createGridBreakpoints(props.theme.grid.breakpoints, props.theme.grid.spacing)}
`
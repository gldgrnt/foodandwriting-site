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

/* ROW */
export const GridRow = ({ children }) => (
    <StyledRow>{children}</StyledRow>
)

GridRow.propTypes = {
    children: PropTypes.node.isRequired,
}

const StyledRow = styled.div`
    position: relative;
    display: flex;
    flex-basis: 100%;
    flex-wrap: wrap;
    margin-left: -${props => props.theme.grid.spacing}px;
    margin-right: -${props => props.theme.grid.spacing}px;
    justify-content: ${props => props.justify || 'unset'};
    align-items: ${props => props.align || 'unset'};
`

/* COL */
export const GridCol = ({ cols, children }) => (
    <StyledCol cols={cols}>{children}</StyledCol>
)

GridCol.propTypes = {
    children: PropTypes.node.isRequired,
    cols: PropTypes.string
}

const calculateCols = (cols, maxCols) => {
    cols = parseInt(cols)

    if (!cols) {
        return 'auto'
    }

    if (cols > maxCols) {
        return '100%'
    }

    return `${cols < maxCols ? (100 / maxCols) * cols : 100}%`
}

const StyledCol = styled.div`
    position: relative;
    padding-left: ${props => props.theme.grid.spacing}px;
    padding-right: ${props => props.theme.grid.spacing}px;
    flex-grow: ${props => props.cols ? 0 : 1};
    max-width: ${props => calculateCols(props.cols, props.theme.grid.columns)}
`
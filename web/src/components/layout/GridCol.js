import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
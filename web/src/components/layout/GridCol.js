import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { responsiveStylesFromProp } from '../../utils'

export const GridCol = ({ cols, children }) => (
    <StyledCol cols={cols}>{children}</StyledCol>
)

GridCol.propTypes = {
    children: PropTypes.node.isRequired,
    cols: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

const calculateCols = (cols, maxCols) => {

    switch (typeof cols) {

        case 'string':
            cols = parseInt(cols)

            if (!cols) {
                return 'none'
            }

            if (cols > maxCols) {
                return '100%'
            }

            return `${cols < maxCols ? (100 / maxCols) * cols : 100}%`

        case 'object':
            let values = Object.fromEntries(
                Object.entries(cols).map((key) => [key[0], `${key[1] < maxCols ? (100 / maxCols) * key[1] : 100}%`])
            )
            return values

        default:
            return
    }


}

const StyledCol = styled.div`
    position: relative;
    padding-left: ${props => props.theme.grid.spacing}px;
    padding-right: ${props => props.theme.grid.spacing}px;
    flex: 1;

    ${props => responsiveStylesFromProp(calculateCols(props.cols, props.theme.grid.columns), 'max-width')}
`
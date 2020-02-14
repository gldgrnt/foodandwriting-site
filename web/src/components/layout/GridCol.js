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
            let holdingArray = []
            // Loop through cols object keys too create array of key value arrays
            for (const key in cols) {
                holdingArray.push([ key, `${cols[key] < maxCols ? (100 / maxCols) * cols[key] : 100}%`])
            }

            let values = {}
            // Set each value in the values object
            holdingArray.forEach(prop => {
                values[prop[0]] = prop[1]
            })

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
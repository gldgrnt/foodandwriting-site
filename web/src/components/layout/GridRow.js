
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
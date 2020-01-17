import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


// Container
export const GridContainer = ({ children }) => (
    <StyledContainer>{children}</StyledContainer>
)

GridContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    max-width: 1300px;
    margin: auto;
    justify-content: ${props => props.justify || 'unset'};
    align-items: ${props => props.align || 'unset'};
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        max-width: 1200px;
    }
`
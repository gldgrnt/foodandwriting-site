import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const SmallTitle = ({ children }) => (
    <StyledSmallTitleContainer>
        {children}
    </StyledSmallTitleContainer>
)

SmallTitle.propTypes = {
    children: PropTypes.node.isRequired
}

const StyledSmallTitleContainer = styled.div`
    display: block;
    
    & > * {
        font-family: ${props => props.theme.font.family.sans};
        margin: 0;
        font-size: ${props => props.theme.font.size.small};
        font-weight: bold;
        text-transform: uppercase;
        color: ${props => props.theme.color.darkGrey};
    }
`
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const SmallCaps = ({ children, as = null, size, color }) => {

    return (
        <StyledSmallCaps as={as} size={size} color={color}>
            {children}
        </StyledSmallCaps>
    )
}

SmallCaps.propTypes = {
    as: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
}

const StyledSmallCaps = styled.span`
    display: block;
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size[props.size] || props.theme.font.size.regular};
    font-weight: bold;
    text-transform: uppercase;
    color: ${props => props.theme.color[props.color] || props.theme.color.darkGrey};
`
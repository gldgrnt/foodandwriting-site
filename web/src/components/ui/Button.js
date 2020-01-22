import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const Button = ({ children, link }) => {

    return (
        <StyledLink to={link}>
            {children}
        </StyledLink>
    )
}

Button.propTypes = {
    children: PropTypes.any.isRequired,
    link: PropTypes.string.isRequired
}


const StyledLink = styled(Link)`
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size.tiny};
    font-weight: bold;
    text-transform: uppercase;
    color: ${props => props.theme.color.mediumGrey};

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }
`
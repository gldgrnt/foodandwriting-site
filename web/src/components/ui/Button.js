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
    display: inline-block;
    position: relative;
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size.tiny};
    font-weight: bold;
    text-transform: uppercase;
    color: ${props => props.theme.color.mediumGrey};

    &,
    &::after {
        text-decoration: none;
        transition: ${props => props.theme.transition.fast};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 0;
        height: 1px;
        width: 100%;
        background: ${props => props.theme.color.mediumGrey}
    }

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
        
        &::after {
            background: ${props => props.theme.color.black};
        }
    }
`
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const InternalLink = ({ children, to, ...type }) => {

    // Conditionally render each type of Link
    switch (true) {
        case !!type.primary:
            return <PrimaryLink to={to}>{children}</PrimaryLink>

        case !!type.secondary:
            return <SecondaryLink to={to}>{children}</SecondaryLink>

        case !!type.title:
            return <TitleLink to={to}>{children}</TitleLink>

        default:
            return <BaseLink to={to}>{children}</BaseLink>
    }
}

InternalLink.propTypes = {
    children: PropTypes.any.isRequired,
    to: PropTypes.string.isRequired
}

const BaseLink = styled(Link)`
    display: inline-block;
    position: relative;
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size.tiny};
    font-weight: bold;
    text-decoration: none;
`

// Primary Link
const PrimaryLink = styled(BaseLink)`
    color: ${props => props.theme.color.mediumGrey};
    text-transform: uppercase;
    
    &,
    &::after {
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

// Secondary Link
const SecondaryLink = styled(BaseLink)`
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.black};
    padding: 7px 10px;
    background: ${props => props.theme.color.yellow};
    line-height: 1.2;
    transition: background-color 0.3s ease;
    text-transform: uppercase;

    &:hover,
    &:focus {
        background: ${props => props.theme.color.whiteGrey};
    }
`

// Title Link
const TitleLink = styled(BaseLink)`
    display: inline-block;
    color: ${props => props.theme.color.black};
    text-decoration: none;
    transition: text-decoration ${props => props.theme.transition.fast};
    
    > * {
        margin: 0;
    }

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`
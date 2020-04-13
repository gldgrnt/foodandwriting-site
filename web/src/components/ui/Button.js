import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Button = ({ children, size, ...props }) => {

    switch (true) {
        case !!props.primary:
            return <PrimaryButton size={size} onClick={props.onClick} {...props}>{children}</PrimaryButton>
        case !!props.secondary:
            return <SecondaryButton size={size} onClick={props.onClick} {...props}>{children}</SecondaryButton>
        default:
            return <BaseButton size={size} onClick={props.onClick} {...props}>{children}</BaseButton>
    }
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
}

const BaseButton = styled.button`
    display: inline-flex;
    border: none;
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size[props.size] || props.theme.font.size.tiny};
    font-weight: bold;
    text-decoration: none;
` 

const PrimaryButton = styled(BaseButton)`
    color: ${props => props.theme.color.black};
    padding: 7px 10px;
    background: ${props => props.theme.color.yellow};
    font-size: ${props => props.theme.font.size[props.size] || props.theme.font.size.tiny};
    line-height: 1.2;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-transform: uppercase;

    &:hover,
    &:focus {
        background: ${props => props.theme.color.whiteGrey};
    }
`

const SecondaryButton = styled(BaseButton)`
    color: ${props => props.theme.color.black};
    padding: 7px 10px;
    font-size: ${props => props.theme.font.size[props.size] || props.theme.font.size.tiny};
    line-height: 1.2;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-transform: uppercase;

    &,
    &:hover,
    &:focus {
        background: white;
    }
`
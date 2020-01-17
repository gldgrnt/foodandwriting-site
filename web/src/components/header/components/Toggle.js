import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Toggle = ({ handler, active, children }) => {
    const handleClick = (event) => {
        event.preventDefault();
        handler();
    }

    const handleKeyDown = (event) => {
        // If spacebar wasn't pressed, ignore event
        if (event.which !== 32) {
            return;
        }
        handleClick(event);
    }

    return (
        <IconLink href="#" onClick={handleClick} onKeyDown={handleKeyDown} active={active}>
            {children}
        </IconLink >
    )
}

Toggle.propTypes = {
    active: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

const IconLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0 25px;
    text-decoration: none;
    background: ${props => props.active ? props.theme.color.whiteGrey : 'white'};
    color: ${props => props.theme.color.black};
    transition: background ${props => props.theme.transition.fast};

    &:hover, 
    &:focus {
        background: ${props => props.theme.color.whiteGrey};
    }

    svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
    }
`
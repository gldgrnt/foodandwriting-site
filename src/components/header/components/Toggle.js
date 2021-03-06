import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FiX } from "react-icons/fi"

import { responsiveBreakpointDown } from "../../../utils"

export const Toggle = ({ handler, active, children, ...rest }) => {
    const handleClick = event => {
        event.preventDefault()
        handler()
    }

    const handleKeyDown = event => {
        // If spacebar wasn't pressed, ignore event
        if (event.which !== 32) {
            return
        }
        handleClick(event)
    }

    return (
        <IconLink
            href="#"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={active && "active"}
            {...rest}
        >
            {active ? <FiX /> : children}
        </IconLink>
    )
}

Toggle.propTypes = {
    active: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

const IconLink = styled.button`
    display: flex;
    align-items: center;
    padding: 0 ${props => props.theme.grid.spacing}px;
    text-decoration: none;
    background-color: white;
    color: ${props => props.theme.color.black};
    transition: background-color ${props => props.theme.transition.fast};
    outline-width: 0;
    border: none;

    &:hover, 
    &:focus {
        background-color: ${props => props.theme.color.whiteGrey};

        ${responsiveBreakpointDown("tablet", `background-color: white;`)}
    }

    &.active {
        ${props =>
            responsiveBreakpointDown(
                "tablet",
                `background-color: ${props.theme.color.whiteGrey};`
            )}
    }

    svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
    }

    ${responsiveBreakpointDown(
        "mobile",
        `
        svg {
            stroke-width: 3px;
        }
    `
    )}

    /* Menu styles */
    ${props =>
        props.menu &&
        `
        display: none;

        ${responsiveBreakpointDown(
            "tablet",
            `
            display: flex;
        `
        )}
    `}
`

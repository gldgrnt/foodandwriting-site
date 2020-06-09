import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowDown } from 'react-icons/fi'
import { responsiveBreakpointDown } from '../../utils'

/**
 * ScrollDown component
 */
export const ScrollDown = ({ tagId, text = 'Scroll down' }) => {

    const handleScrollDownClick = (event) => {
        event.preventDefault()

        window.scrollTo({
            top: document.getElementById(tagId).clientHeight,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <ScrollDownButton onClick={handleScrollDownClick} aria-label="Scroll down">
            <Text>{text}</Text>
            <Arrow />
        </ScrollDownButton>
    )
}

/**
 * PropTypes
 */
ScrollDown.propTypes = {
    tagId: PropTypes.string.isRequired,
    text: PropTypes.string
}

/**
 * Styles
 */
const ScrollDownButton = styled.button`
    position: absolute;
    bottom: 40px;
    display: flex;
    background: none;
    border: none;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.color.darkGrey};
    transition: color ${props => props.theme.transition.fast};

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }
`

const Text = styled.span`
    display: inline-block;
    font-family: ${props => props.theme.font.family.sans};
    font-weight: bold;
    font-size: ${props => props.theme.font.size.tiny};
    text-transform: uppercase;

    ${responsiveBreakpointDown('mobile', `
        display: none;
    `)}
`

const Arrow = styled(FiArrowDown)`
    ${responsiveBreakpointDown('mobile', `
        transform: scale(1.1);
    `)}
`
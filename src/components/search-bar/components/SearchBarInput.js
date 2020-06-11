import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connectSearchBox } from 'react-instantsearch-dom'
import { GrPowerReset } from "react-icons/gr"

import { responsiveBreakpointDown } from '../../../utils'

/**
 * Custom search box component (necessary to add debounce)
 * This component is then wrapped in with the connectSearchBox HOF
 */
const CustomSearchBox = ({ currentRefinement, refine }) => {
    // Initialise state
    const [query, setQuery] = useState(currentRefinement)
    const [timer, setTimer] = useState(null)

    // Search 1 second after the user has finished typing
    const handleChange = event => {
        // Get input value
        const value = event.currentTarget.value

        // Update state
        clearTimeout(timer)

        // Restart the timer on every input change
        setTimer(setTimeout(() => {
            refine(value)
        }, 800))
        setQuery(value)

    }

    // Clear search bar
    const clearSearch = () => {
        refine("")
        setQuery("")
    }

    return (
        <>
            <input
                value={query}
                onChange={handleChange}
                placeholder="Search here"
                aria-label="Search here"
            />
            <button title="Clear search bar" aria-label="Clear search bar" onClick={clearSearch}>
                <GrPowerReset />
            </button>
        </>
    )
}

/**
 * PropTypes
 */
CustomSearchBox.propTypes = {
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired
}

/**
 * Main SearchBar component
 */
export const SearchBarInput = ({ closeDropdown }) => {

    // Search on enter press
    const ConnectedCustomSearchBox = connectSearchBox(CustomSearchBox)

    // Create function that can be added and remove from window event listeners
    const closeSearchDropdown = useCallback((event) => {
        if (event.code !== 'Escape') return

        // Call close dropdown function prop
        closeDropdown()
    }, [closeDropdown])

    // Allow dropdown to be closed by ESC key
    useEffect(() => {
        window.addEventListener('keydown', closeSearchDropdown)

        // Clean up by removing event listener
        return () => { window.removeEventListener('keydown', closeSearchDropdown) }
    }, [closeDropdown, closeSearchDropdown])

    return (
        <div>
            <SearchBoxWrapper>
                <ConnectedCustomSearchBox />
            </SearchBoxWrapper>
        </div>
    )
}

/**
 * PropTypes
 */
SearchBarInput.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}


/**
 * Styles
 */
const SearchBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    background: ${props => props.theme.color.yellow};
    margin: auto;

    ${responsiveBreakpointDown('laptop', `
        max-width: none;
        margin-bottom: 20px;
    `)}

    input {
        padding: 15px 20px;
        border: none;
        font-family: ${props => props.theme.font.family.serif};
        font-size: ${props => props.theme.font.size.medium};
        flex-grow: 1;
        outline: none;
        line-height: initial;
        max-width: calc(100% - 50px);
        background: none;

        &::placeholder {
            opacity: 1;
        }

        ${props => responsiveBreakpointDown('mobile', `
            font-size: ${props.theme.font.size.increased};
        `)}
    }

    input:placeholder-shown + button svg {
        /* opacity: 0.6; */
    }

    button {
        position: relative;
        background: none;
        border: none;
        width: 50px;
        min-width: 50px;

        svg {
            position: absolute;
            top: 52.5%;
            left: 50%;
            transform: scale(1.2) translate(-50%, -50%);
            pointer-events: none;

            path {
                stroke-width: 2.5px;
            }
        }
    }
`
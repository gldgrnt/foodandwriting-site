import React, { useState, useEffect, useCallback } from "react"
import { useSearch } from "../../hooks"
import { SearchBar, SearchBarResults } from './components'
import PropTypes from 'prop-types'

export const SearchBarContainer = ({ closeDropdown }) => {
    const [state, setState] = useState({ inputValue: '', queryValue: '', timeout: 0 })
    const searchBarRef = React.createRef()
    const { results, loading } = useSearch(state.queryValue)

    const focusInput = useCallback(() => {
        searchBarRef.current.focus()
    }, [searchBarRef])

    const getResults = (query) => {
        if (!query) return

        setState(oldState => ({ ...oldState, queryValue: query }))
    }

    const closeSearchDropdown = useCallback((event) => {
        // Ignore if wasn't a click or esc key press
        if (event.type === 'keydown' && event.which !== 27) return

        // Close menu
        event.preventDefault()
        closeDropdown()
    }, [closeDropdown])

    /* HANDLERS */
    const handleInputChange = (event) => {
        let value = event.target.value
        // Update input value
        setState(oldState => ({ ...oldState, inputValue: value }))

        // Get results 
        clearTimeout(state.timeout)
        setState(oldState => ({
            ...oldState, timeout: setTimeout(() => {
                getResults(value.trim())
            }, 1000)
        }))
    }

    const handleEnterPress = (event) => {
        // Only continue if Enter was pressed
        if (event.which !== 13) return

        let value = event.target.value
        // Get results 
        clearTimeout(state.timeout)
        getResults(value.trim())
    }

    /* EFFECTS */
    // Add window escape key event listener
    useEffect(() => {
        window.addEventListener('keydown', closeSearchDropdown)

        // Clean up by removing event listener
        return () => {
            window.removeEventListener('keydown', closeSearchDropdown)
        }
    }, [closeSearchDropdown])

    // Focus input
    useEffect(() => {
        focusInput()
    }, [focusInput])

    return (
        <>
            <SearchBar
                value={state.inputValue}
                onChange={handleInputChange}
                ref={searchBarRef}
                onKeyUp={handleEnterPress}
                closeDropdown={closeDropdown} />

            <SearchBarResults loading={loading} results={results} />
        </>
    )
}

SearchBarContainer.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}


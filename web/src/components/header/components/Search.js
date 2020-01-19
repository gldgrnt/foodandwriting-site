import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import { FiSearch, FiX } from "react-icons/fi";
import { useSearch } from "../../../fetch/useSearch";

export const Search = ({ closeDropdown }) => {
    const [state, setState] = useState({ inputValue: '', queryValue: '', timeout: 0 });
    const searchBarRef = React.createRef();
    const { results, loading } = useSearch(state.queryValue);

    /* SPECIFIC FUNCTIONS */
    const clearSearchBar = () => {
        setState(oldState => ({ ...oldState, inputValue: '', queryValue: '' }));
        focusInput();
    }

    const focusInput = useCallback(() => {
        searchBarRef.current.focus();
    }, [searchBarRef])

    const getResults = (query) => {
        if (!query) return;

        setState(oldState => ({ ...oldState, queryValue: query }))
    }

    const closeSearchDropdown = useCallback((event) => {
        // Ignore if wasn't a click or esc key press
        if (event.type === 'keydown' && event.which !== 27) return;

        // Close menu
        event.preventDefault();
        closeDropdown();
    }, [closeDropdown]);

    /* HANDLERS */
    const handleInputChange = (event) => {
        let value = event.target.value;
        // Update input value
        setState(oldState => ({ ...oldState, inputValue: value }))

        // Get results 
        clearTimeout(state.timeout);
        setState(oldState => ({
            ...oldState, timeout: setTimeout(() => {
                getResults(value.trim());
            }, 1000)
        }))
    }

    const handleEnterPress = (event) => {
        // Only continue if Enter was pressed
        if (event.which !== 13) return;

        let value = event.target.value
        // Get results 
        clearTimeout(state.timeout);
        getResults(value.trim());
    }

    /* EFFECTS */
    // Add window escape key event listener
    useEffect(() => {
        window.addEventListener('keydown', closeSearchDropdown);

        // Clean up by removing event listener
        return () => {
            window.removeEventListener('keydown', closeSearchDropdown);
        }
    }, [closeSearchDropdown])

    // Focus input
    useEffect(() => {
        focusInput();
    }, [focusInput]);

    return (
        <>
            <SearchWrapper>
                <FiSearch />

                <SearchBar
                    placeholder="Search here"
                    value={state.inputValue}
                    onChange={handleInputChange}
                    ref={searchBarRef}
                    onKeyUp={handleEnterPress}
                    type="text" />

                <StyledButton onClick={clearSearchBar}>
                    <FiX />
                </StyledButton>

            </SearchWrapper>

            <ResultsWrapper>
                {!loading && results.map(result => (
                    <p key={result._id}>{result.title || result._id}</p>
                ))}
            </ResultsWrapper>
        </>
    )
}

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    svg {
        transform: scale(1.2);
        stroke-width: 2.5px;
        pointer-events: none;
    }
`

const SearchBar = styled.input`
    flex-grow: 1;
    margin: 0 25px;
    border: none;
    background: none;
    padding: 0.6rem 0;
    border-bottom: 2px solid ${props => props.theme.color.mediumGrey};
    transition: border-color ${props => props.theme.transition.fast};
    outline: none;
    font-size: ${props => props.theme.font.size.increased};

    &:focus {
        border-color: black;
    }
`

const StyledButton = styled.button`
    background: none;
    border: none;
    padding: 0;
`;

const ResultsWrapper = styled.div`
    width: 100;
    
    & > * {
        padding: 40px 0;
        margin: 0;
    }
`
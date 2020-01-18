import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import { FiSearch, FiX } from "react-icons/fi";
import { useSearch } from "../../../api/useSearch";

export const Search = ({ closeDropdown }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchTerm, setSearchTerm] = useState({ timeout: 0, query: '' });
    const { results, loading } = useSearch(searchTerm.query);
    let timer = 0;

    /* SPECIFIC FUNCTIONS */
    // Clear search bar
    const clearSearchBar = () => {
        setSearchValue('');
        setSearchTerm('');
        focusInput();
    }

    const focusInput = () => {
        console.log('Focus input!');
    }

    const getResults = (string) => {
        setSearchTerm({ query: string });
    }

    /* HANDLERS */
    // Handle on change on input
    const handleInputChange = (e) => {
        let value = e.target.value;
        // Update input value
        setSearchValue(value);

        // Get results 
        clearTimeout(searchTerm.timeout);
        setSearchTerm({
            timeout: setTimeout(() => {
                getResults(value);
            }, 1000)
        })
    }

    // Handle closing search dropdown
    const handleCloseSearch = useCallback((event) => {
        // Ignore if wasn't a click or esc key press
        if (event.type === 'keydown' && event.which !== 27) {
            return;
        }

        // Close menu
        event.preventDefault();
        closeDropdown();
    }, [closeDropdown]);


    /* EFFECTS */
    // Add window escape key event listener
    useEffect(() => {
        window.addEventListener('keydown', handleCloseSearch);

        // Clean up by removing event listener
        return () => {
            window.removeEventListener('keydown', handleCloseSearch);
        }
    }, [handleCloseSearch])

    // Focus input
    useEffect(() => {
        focusInput();
    }, []);

    return (
        <>
            <SearchWrapper>
                <FiSearch />

                <SearchBar placeholder="Search here" value={searchValue} onChange={handleInputChange} type="text" />

                <StyledButton onClick={clearSearchBar}>
                    <FiX />
                </StyledButton>

            </SearchWrapper>
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
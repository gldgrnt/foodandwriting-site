import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import { FiSearch, FiX } from "react-icons/fi";

export const Search = ({ closeDropdown }) => {
    const [searchTerm, setSeatchTerm] = useState('');

    // Clear search bar
    const clearSearchBar = () => {
        setSeatchTerm('');
    }

    // Handle closing search dropdown
    const handleCloseSearch = useCallback((event) => {
        // Ignore if wasn't a clikc or esc key press
        if (event.type === 'keydown' && event.which !== 27) {
            return;
        }

        // Close menu
        event.preventDefault();
        closeDropdown();
    }, [closeDropdown]);

    // Add window escape key event listener
    useEffect(() => {
        window.addEventListener('keydown', handleCloseSearch);

        // Clean up by removing event listener
        return () => {
            window.removeEventListener('keydown', handleCloseSearch);
        }
    }, [handleCloseSearch])

    return (
        <SearchWrapper>
            <FiSearch />

            <SearchBar placeholder="Search here" value={searchTerm} onChange={(e) => setSeatchTerm(e.target.value)} type="text" />

            <StyledButton onClick={clearSearchBar}>
                <FiX />
            </StyledButton>
        </SearchWrapper>
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
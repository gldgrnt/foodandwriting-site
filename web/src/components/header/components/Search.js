import React from "react";
import styled from 'styled-components'
import { FiSearch, FiX } from "react-icons/fi";

export const Search = () => {

    return (
        <SearchWrapper>
            <FiSearch />
            <SearchBar placeholder="Search here" type="text" />
            <FiX />
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
    }
`

const SearchBar = styled.input`
    flex-grow: 1;
    margin: 0 25px;
    border: none;
    background: none;
    padding: 5px 0;
    border-bottom: 2px solid ${props => props.theme.color.mediumGrey};
    transition: border-color ${props => props.theme.transition.fast};
    outline: none;

    &:focus {
        border-color: black;
    }
`

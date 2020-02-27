import React from 'react'
import styled from 'styled-components'
import { FiSearch, FiX } from "react-icons/fi"
import PropTypes from 'prop-types'

export const SearchBar = React.forwardRef((props, ref) => (
    <SearchWrapper>
        <FiSearch />

        <StyledInput
            placeholder="Search here"
            value={props.value}
            onChange={props.onChange}
            ref={ref}
            onKeyUp={props.onKeyUp}
            type="text" />

        <StyledButton>
            <FiX />
        </StyledButton>

    </SearchWrapper>
))

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired
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

const StyledInput = styled.input`
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
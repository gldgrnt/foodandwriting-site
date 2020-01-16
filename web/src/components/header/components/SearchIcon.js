import React, { useState } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

export const SearchIcon = (props) => {
    const [active, setActive] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setActive(!active);
        props.openSearch();
    }

    return (
        <IconLink href="#" onClick={e => handleClick(e)} active={active}>
            <Icon />
        </IconLink >
    )
}

const IconLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0 25px;
    text-decoration: none;
    background: ${props => props.active ? props.theme.color.whiteGrey : 'white'};
    color: ${props => props.theme.color.black};
    transition: background ${props => props.theme.transition.fast};

    &:hover {
        background: ${props => props.theme.color.whiteGrey};
    }
`

const Icon = styled(FiSearch)`
    height: 1rem; 
    stroke-width: 2.5px;
    pointer-events: none;
`
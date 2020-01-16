import React, { useState } from "react"
import styled from 'styled-components'

import { Navigation, Logo, SearchIcon } from './components'

export const Header = () => {
    const [dropdownState, setDropdownState] = useState({ searchOpen: false, menuOpen: false });

    const handleSearchClick = () => {
        if (dropdownState.searchOpen) {
            // Close menu if open
            setDropdownState({ searchOpen: false });
        } else {
            // Open menu
            setDropdownState({ searchOpen: true, menuOpen: false });
        }
    }

    return (
        <header>
            <NavContainer>
                <ItemWrapper>
                    <Logo />
                </ItemWrapper>

                <ItemWrapper stretch>
                    <StyledNavigation />
                </ItemWrapper>

                <IconsWrapper >
                    <SearchIcon openSearch={handleSearchClick} />

                </IconsWrapper>
            </NavContainer >

            {(dropdownState.searchOpen || dropdownState.menuOpen) &&
                <DropdownContainer>
                    {dropdownState.searchOpen && 'Search open'}
                </DropdownContainer>
            }
        </header>
    )
}

// Nav
const NavContainer = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    align-items: stretch;
`

const ItemWrapper = styled.div`
    padding: 35px 0;
    flex-grow: ${props => props.stretch ? "1" : "0"};
`

const IconsWrapper = styled.div`
    padding-left: 60px;

    > * {
        height: 100%;
    }
`

const StyledNavigation = styled(Navigation)`
    width: 100%;
    text-align: right;
`

// Dropdown
const DropdownContainer = styled.div`
    background: ${props => props.theme.color.whiteGrey};
    padding: 40px;
`
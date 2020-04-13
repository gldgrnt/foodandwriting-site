import React, { useState, useEffect, useRef } from "react"
import styled from 'styled-components'
import { FiMenu, FiSearch } from 'react-icons/fi'

import { Logo, Toggle } from './components'
import { SearchBarContainer } from '../search-bar'
import { Navigation, NavigationDropdown } from '../navigation'
import { GridContainer } from '../layout'
import { responsiveBreakpointDown } from "../../utils"

export const Header = () => {
    const [dropdownState, setDropdownState] = useState({ isSearchOpen: false, isMenuOpen: false })
    const [dropdownInnerHeight, setDropdownInnerHeight] = useState(0)

    const handleToggleClick = (toggling = null) => {
        if (toggling === null) {
            return
        }
        let closing = toggling === 'isSearchOpen' ? 'isMenuOpen' : 'isSearchOpen'
        // Close menu if it's already open
        if (dropdownState[toggling]) setDropdownState({ [toggling]: false });
        // Open menu
        else setDropdownState({ [toggling]: true, [closing]: false })
    }

    // Set up click elsewhere event handler - call once via []
    useEffect(() => {
        document.querySelectorAll('main, footer').forEach(area => {
            area.addEventListener('click', () => {
                setDropdownState({ isSearchOpen: false, isMenuOpen: false })
            })
        })
    }, [])

    // Create ref to dropdown container to calculare child height after render
    const dropdownInner = useRef(null)
    useEffect(() => {
        if (dropdownState.isSearchOpen === true || dropdownState.isMenuOpen === true) {
            setDropdownInnerHeight(dropdownInner.current.clientHeight)
        }
    }, [dropdownState])

    // Conditionally render dropdowns
    const isDropdownOpen = dropdownState.isSearchOpen || dropdownState.isMenuOpen
    let activeDropdown = null

    // Pass close menu func down as prop
    const closeDropdown = () => {
        setDropdownState({ isSearchOpen: false, isMenuOpen: false })
    }

    if (dropdownState.isSearchOpen) activeDropdown = <SearchBarContainer closeDropdown={closeDropdown} />
    else if (dropdownState.isMenuOpen) activeDropdown = <NavigationDropdown closeDropdown={closeDropdown} />


    return (
        <StyledHeader>
            <HeaderUpperWrapper>
                <GridContainer align="stretch" justify="space-between" removeMobilePadding={true}>
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>

                    <NavigationWrapper>
                        <Navigation />
                    </NavigationWrapper>

                    <TogglesWrapper>
                        <Toggle handler={() => handleToggleClick('isSearchOpen')} active={!!dropdownState.isSearchOpen}>
                            <FiSearch />
                        </Toggle>

                        <Toggle menu handler={() => handleToggleClick('isMenuOpen')} active={!!dropdownState.isMenuOpen}>
                            <FiMenu />
                        </Toggle>
                    </TogglesWrapper>
                </GridContainer >
            </HeaderUpperWrapper>

            <DropdownContainer isDropdownOpen={isDropdownOpen} maxHeight={dropdownInnerHeight}>
                {isDropdownOpen &&
                    <div ref={dropdownInner}>
                        <GridContainer>
                            {activeDropdown && 
                                <DropdownWrapper>
                                    {activeDropdown}
                                </DropdownWrapper>
                            }
                        </GridContainer>
                    </div>
                }
            </DropdownContainer>
        </StyledHeader>
    )
}

// Nav
const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 50;
    background: white;
`

const HeaderUpperWrapper = styled.div`
    ${responsiveBreakpointDown('tablet', `
        border-bottom: 1px solid #e6e6e6; 
    `)}
`

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px 0;

    ${props => responsiveBreakpointDown('mobile', `
        padding-left: ${props.theme.grid.spacing}px;
    `)}
`

const NavigationWrapper = styled.div`
    flex-grow: 1;
    padding-right: 80px;

    > * {
        height: 100%;
    }

    ${responsiveBreakpointDown('tablet', `
        display: none;
    `)}
`

const TogglesWrapper = styled.div`
    display: flex;
    padding-left: 60px;

    > * {
        height: 100%;
    }

    ${responsiveBreakpointDown('mobile', `
        padding-left: 0;
        margin-right: 0;
    `)}
`

// Dropdown
const DropdownContainer = styled.div`
    position: absolute;
    width: 100%;
    overflow: hidden;
    background: ${props => props.theme.color.whiteGrey};
    transition: height ${props => props.theme.transition.fast};
    box-shadow: 0px 20px 20px 0px #35353512;
`

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    width: 100%;
    max-height: calc(100vh - 78px);
    overflow: hidden;

    ${responsiveBreakpointDown('tablet', `
        padding: 30px 0;
        height: calc(100vh - 78px);
    `)}
`
import React, { useState, useEffect, useRef } from "react"
import styled from 'styled-components'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { Navigation, Logo, Toggle, SearchContainer } from './components'
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

    if (dropdownState.isSearchOpen) activeDropdown = <SearchContainer closeDropdown={closeDropdown} />
    else if (dropdownState.isMenuOpen) activeDropdown = <span>Menu dropdown coming soon...</span>


    return (
        <StyledHeader>
            <HeaderUpperWrapper>
                <GridContainer align="stretch" justify="space-between" removeMobilePadding={true}>
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>

                    <NavigationWrapper>
                        <StyledNavigation />
                    </NavigationWrapper>

                    <TogglesWrapper>
                        <Toggle handler={() => handleToggleClick('isSearchOpen')} active={!!dropdownState.isSearchOpen}>
                            <FiSearch />
                        </Toggle>

                        <Toggle handler={() => handleToggleClick('isMenuOpen')} active={!!dropdownState.isMenuOpen}>
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

    ${props => responsiveBreakpointDown('mobile', `
        padding-left: ${props.theme.grid.spacing}px;
    `)}
`

const NavigationWrapper = styled.div`
    padding: 25px 0;
    flex-grow: 1;

    ${responsiveBreakpointDown('mobile', `
        display: none;
    `)}
`

const TogglesWrapper = styled.div`
    display: flex;
    padding-left: 60px;
    margin-right: -${props => props.theme.grid.spacing}px;

    > * {
        height: 100%;
    }

    ${responsiveBreakpointDown('mobile', `
        padding-left: 0;
        margin-right: 0;
    `)}
`

const StyledNavigation = styled(Navigation)`
    width: 100%;
    text-align: right;
`

// Dropdown
const DropdownContainer = styled.div`
    position: absolute;
    width: 100%;
    overflow: hidden;
    background: ${props => props.theme.color.whiteGrey};
    transition: height ${props => props.theme.transition.fast};
    /* min-height: ${props => props.isDropdownOpen ? props.maxHeight + 'px' : '0'}; */
`

const DropdownWrapper = styled.div`
    padding: 40px 0;

    ${responsiveBreakpointDown('tablet', `
        padding: 30px 0;
        height: 100vh;
    `)}
`
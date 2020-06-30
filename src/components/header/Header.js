import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FiMenu, FiSearch } from "react-icons/fi"

import { Logo, Toggle } from "./components"
import { SearchBarContainer } from "../search-bar"
import { Navigation, NavigationDropdown } from "../navigation"
import { GridContainer } from "../layout"
import { responsiveBreakpointDown } from "../../utils"

export const Header = () => {
    const [dropdownState, setDropdownState] = useState({
        isSearchOpen: false,
        isMenuOpen: false,
    })

    const handleToggleClick = (toggling = null) => {
        if (toggling === null) {
            return
        }
        let closing =
            toggling === "isSearchOpen" ? "isMenuOpen" : "isSearchOpen"
        // Close menu if it's already open
        if (dropdownState[toggling]) setDropdownState({ [toggling]: false })
        // Open menu
        else setDropdownState({ [toggling]: true, [closing]: false })
    }

    // Set up click elsewhere event handler - call once via []
    useEffect(() => {
        // Close dropdown on area press
        document.querySelectorAll("main, footer").forEach(area => {
            area.addEventListener("click", () =>
                setDropdownState({ isSearchOpen: false, isMenuOpen: false })
            )
        })
    }, [])

    // Conditionally render dropdowns
    const isDropdownOpen =
        dropdownState.isSearchOpen || dropdownState.isMenuOpen
    let activeDropdown = null

    // Pass close menu func down as prop
    const closeDropdown = () => {
        setDropdownState({ isSearchOpen: false, isMenuOpen: false })
    }

    if (dropdownState.isSearchOpen)
        activeDropdown = <SearchBarContainer closeDropdown={closeDropdown} />
    else if (dropdownState.isMenuOpen)
        activeDropdown = <NavigationDropdown closeDropdown={closeDropdown} />

    // Add class to body and html tag when menu is open
    useEffect(() => {
        if (typeof window === undefined) {
            return
        }
        const html = document.querySelector("html")

        if (isDropdownOpen) {
            html.setAttribute("scroll", html.scrollTop)
            html.classList.add("menu-open")
        }

        if (!isDropdownOpen) {
            const scroll = parseInt(html.getAttribute("scroll"))

            if (
                scroll !== undefined &&
                scroll !== null &&
                window.innerWidth < 769
            ) {
                html.classList.remove("menu-open")
                html.scrollTop = scroll
            }
        }
    }, [isDropdownOpen])

    return (
        <StyledHeader>
            <HeaderUpperWrapper>
                <GridContainer
                    align="stretch"
                    justify="space-between"
                    removeMobilePadding={true}
                >
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>

                    <NavigationWrapper>
                        <Navigation />
                    </NavigationWrapper>

                    <TogglesWrapper>
                        <Toggle
                            handler={() => handleToggleClick("isSearchOpen")}
                            active={!!dropdownState.isSearchOpen}
                            aria-label="Toggle search"
                        >
                            <FiSearch />
                        </Toggle>

                        <Toggle
                            menu
                            handler={() => handleToggleClick("isMenuOpen")}
                            active={!!dropdownState.isMenuOpen}
                            aria-label="Toggle menu"
                        >
                            <FiMenu />
                        </Toggle>
                    </TogglesWrapper>
                </GridContainer>
            </HeaderUpperWrapper>

            <DropdownContainer dropdownState={dropdownState}>
                {isDropdownOpen && (
                    <GridContainer>
                        {activeDropdown && (
                            <DropdownWrapper>{activeDropdown}</DropdownWrapper>
                        )}
                    </GridContainer>
                )}
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
    ${responsiveBreakpointDown(
        "mobile",
        `
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
    `
    )}
`

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px 0;

    ${props =>
        responsiveBreakpointDown(
            "mobile",
            `
        padding-top: 25px;
        padding-bottom: 25px;
        padding-left: ${props.theme.grid.spacing}px;
    `
        )}
`

const NavigationWrapper = styled.div`
    flex-grow: 1;
    padding-right: 80px;
    padding-bottom: 4px;

    ${responsiveBreakpointDown("desktop", `padding-right: 20px;`)}
    ${responsiveBreakpointDown("tablet", `display: none;`)}

    > * {
        height: 100%;
    }
`

const TogglesWrapper = styled.div`
    display: flex;
    padding-left: 60px;

    > * {
        height: 100%;
    }

    ${responsiveBreakpointDown(
        "mobile",
        `
        padding-left: 0;
        margin-right: 0;
    `
    )}
`

// Dropdown
const DropdownContainer = styled.div`
    position: absolute;
    width: 100%;
    overflow: hidden;
    background: ${props => props.theme.color.whiteGrey};
    transition: height ${props => props.theme.transition.fast};
    box-shadow: 0px 20px 20px 0px #35353512;

    /* Hide menu if above tablet size but opened on mobile */
    display: ${({ dropdownState }) =>
            dropdownState.isSearchOpen && !dropdownState.isMenuOpen
                ? "block;"
                : "none;"}
        ${responsiveBreakpointDown("tablet", "display: block;")};
`

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    width: 100%;
    max-height: calc(100vh - 78px);
    overflow: hidden;

    ${responsiveBreakpointDown(
        "tablet",
        `
        height: 100vh;
        max-height: 100vh; /** Fallback **/
        max-height: calc((var(--vh-dynamic, 1vh) * 100) - 68px);
    `
    )}

    ${responsiveBreakpointDown(
        "tablet",
        `
        padding: 20px 0 15px;
    `
    )}
`

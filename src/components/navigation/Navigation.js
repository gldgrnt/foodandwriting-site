import React from "react"
import styled from 'styled-components'
import { Menu } from './components'

export const Navigation = () => {

    return (
        <StyledNav>
            <Menu reduced={true} />
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    ul {
        display: flex;
        height: 100%;
        padding: 0;
        margin: 0;
        list-style-type: none;
        justify-content: flex-end;
        align-items: center;
    }

    li {
        display: inline-block;
        padding: 0 35px;
        margin: 0;
        font-family: ${props => props.theme.font.family.sans};

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }

    }

    a {
        text-transform: uppercase;
        font-weight: 600;
        text-decoration: none;
        padding: 7px 10px;
        font-size: ${props => props.theme.font.size.small};
        color: ${props => props.theme.color.darkGrey};
        transition: color ${props => props.theme.transition.fast};

        &:hover,
        &:focus {
            color: ${props => props.theme.color.black};
        }

        &.active {
            &, &:hover, &:focus {
                background: ${props => props.theme.color.yellow};
                color: ${props => props.theme.color.black};
            }
        }
    }
`
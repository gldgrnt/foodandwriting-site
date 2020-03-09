import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TiTimes } from 'react-icons/ti'

import { Menu } from './components'

export const NavigationDropdown = ({ closeDropdown }) => {
    

    return (
        <StyledDropdown>
            <Menu />

            <CloseButton aria-label="Close menu" onClick={closeDropdown}>
                <TiTimes />
            </CloseButton>
        </StyledDropdown>
    )
}

NavigationDropdown.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}

const StyledDropdown = styled.div`
    position: relative;
    height: 100%;

    ul {    
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-height: 450px;
        margin: 0;
        text-align: center;

        li {
            margin: 0;
            list-style-type: none;     
            font-family: ${props => props.theme.font.family.sans};

            &[fullMenuItem]{
                margin-top: 30px;

                + li[fullMenuItem] {
                    margin-top:  0;
                }
            }       

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            a {
                display: inline-block;
                padding: 5px 15px;
                color: ${props => props.theme.color.black};
                font-size: 5vw;
                font-weight: 600;
                text-transform: uppercase;
                text-decoration: none;
                background-color: transparent;
                transition: background-color ${props => props.theme.transition.fast};

                &.active,
                &:hover,
                &:focus {
                    text-decoration: none;
                    background-color: ${props => props.theme.color.yellow};
                }
            }
        }
    }
`

const CloseButton = styled.button`
    position: absolute;
`
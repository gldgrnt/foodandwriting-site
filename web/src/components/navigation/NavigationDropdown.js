import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TiTimes } from 'react-icons/ti'
import {useSpring, animated} from 'react-spring'

import { Menu } from './components'

export const NavigationDropdown = ({ closeDropdown }) => {
    
    // Set up animation props
    const animationProps = useSpring({to: {opacity: 1}, from: {opacity: 0}})

    return (
        <StyledDropdown style={animationProps}>
            <animated.div style={animationProps}>
                <Menu />

                <CloseButton aria-label="Close menu" onClick={closeDropdown}>
                    <TiTimes />
                </CloseButton>
            </animated.div>
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

            &.fullMenuItem{
                margin-top: 30px;

                + li.fullMenuItem {
                    margin-top:  0;
                }
            }       

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            a {
                position: relative;
                display: inline-block;
                padding: 0 15px;
                margin: 5px 0;
                color: ${props => props.theme.color.black};
                font-size: 5vw;
                font-weight: 600;
                text-transform: uppercase;
                text-decoration: none;
                background-color: transparent;
                
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 100%;
                    display: block;
                    background-color: ${props => props.theme.color.yellow};
                    transition: width ${props => props.theme.transition.fast};
                    z-index: 0;
                }

                &:hover,
                &:focus {
                    &::after {
                        width: 100%;
                    }
                }
            }
        }
    }
`

const CloseButton = styled.button`
    position: absolute;
`
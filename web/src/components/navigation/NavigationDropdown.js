import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import {useSpring, animated} from 'react-spring'

import { Menu } from './components'
import { Button } from '../ui'
import { responsiveBreakpointDown } from '../../utils'

export const NavigationDropdown = ({ closeDropdown }) => {
    
    // Set up animation props
    const animationProps = useSpring({to: {opacity: 1}, from: {opacity: 0}})

    return (
        <StyledDropdown style={animationProps}>
            <animated.div style={animationProps}>
                <Menu />

                <Button secondary onClick={closeDropdown}><FiX/> Close menu</Button>
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
    flex-grow: 1;
    overflow: auto;


    > * {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
    }

    ul {    
        height: 100%;
        width: 100%;
        margin: 0;
        flex-grow: 1;

        li {
            margin: 0;
            list-style-type: none;     
            font-family: ${props => props.theme.font.family.sans};
            background-color: white;

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
                display: block;
                padding: 15px 20px;
                font-size: ${props => props.theme.font.size.large};
                font-weight: 600;
                text-transform: uppercase;
                text-decoration: none;
                background-color: white;

                ${props => responsiveBreakpointDown('mobile', `
                    font-size: ${props.theme.font.size.increased};
                `)}

                &.active {
                    background-color: ${props => props.theme.color.yellow};
                }
            }
        }
    }

    button {
        display: inline-flex;
        align-items: center;

        svg {
            stroke-width: 3px;
            margin-right: 3px;
        }
    }
`
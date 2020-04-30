import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import {useSpring, animated} from 'react-spring'
import { FiInstagram } from 'react-icons/fi'
import { graphql, useStaticQuery } from 'gatsby'

import { Menu } from './components'
import { Button } from '../ui'
import { responsiveBreakpointDown } from '../../utils'

export const NavigationDropdown = ({ closeDropdown }) => {

    const { site: { siteMetadata: { instagramURL }} } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    instagramURL
                }
            }
        }
    `)
    
    // Set up animation props
    const animationProps = useSpring({to: {opacity: 1}, from: {opacity: 0}})

    return (
        <StyledDropdown style={animationProps}>
            <animated.div style={animationProps}>
                <Menu />

                <InstagramLink>
                    <a href={instagramURL} target="_blank" rel="noopener noreferrer">
                        <FiInstagram />
                    </a>
                </InstagramLink>

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
    overflow: auto;

    > * {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
    }

    ul {    
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
        flex-grow: 0;

        li {
            margin: 0;
            list-style-type: none;    
            text-align: center;       

            &:not(.space-next) {
                margin-bottom: 30px;
            }

            &.space-next {
                position: relative;
                order: 100;
                margin-top: 40px;

                &::after {
                    content: '';
                    position: absolute;
                    top: -35px;
                    left: 50%;
                    height: 3px;
                    width: 3px;
                    border-radius: 50%;
                    background: ${props => props.theme.color.darkGrey};
                }
            }

            a {
                display: inline-block;
                padding: 0 10px;
                font-size: ${props => props.theme.font.size.large};
                font-weight: 600;
                text-decoration: none;

                ${responsiveBreakpointDown('mobile', `font-size: 7vw;`)}

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

const InstagramLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    flex-grow: 1;
    padding-top: 40px;

    a {
        display: inline-flex;
        padding: 5px;

        svg {
            transform: scale(1.5);
        }
    }
`
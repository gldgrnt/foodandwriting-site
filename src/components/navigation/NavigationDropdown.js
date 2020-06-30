import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FiX } from "react-icons/fi"
import { useSpring, animated } from "react-spring"
import { FiInstagram } from "react-icons/fi"
import { AiOutlineTwitter } from "react-icons/ai"
import { graphql, useStaticQuery } from "gatsby"

import { Menu } from "./components"
import { Button } from "../ui"
import { responsiveBreakpointDown } from "../../utils"

export const NavigationDropdown = ({ closeDropdown }) => {
    const { sanityConfig } = useStaticQuery(graphql`
        query {
            sanityConfig {
                instagramHandle
                twitterHandle
            }
        }
    `)

    // Set up animation props
    const animationProps = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
    })

    return (
        <StyledDropdown style={animationProps}>
            <animated.div style={animationProps}>
                <Menu />

                <DropdownLower>
                    <SocialLink
                        href={`https://instagram.com/${sanityConfig.instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiInstagram />
                    </SocialLink>

                    <SocialLink
                        href={`https://twitter.com/${sanityConfig.twitterHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twitter"
                    >
                        <AiOutlineTwitter />
                    </SocialLink>
                </DropdownLower>

                <Button secondary onClick={closeDropdown}>
                    <FiX /> Close menu
                </Button>
            </animated.div>
        </StyledDropdown>
    )
}

NavigationDropdown.propTypes = {
    closeDropdown: PropTypes.func.isRequired,
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
            text-transform: uppercase;
            font-family: ${props => props.theme.font.family.sans};

            &:not(.space-next) {
                margin-bottom: 30px;
            }

            &.about-link {
                position: relative;
                order: 100;
            }

            a {
                display: inline-block;
                padding: 0 10px;
                font-size: ${props => props.theme.font.size.large};
                font-weight: 600;
                text-decoration: none;

                ${responsiveBreakpointDown("mobile", `font-size: 6vw;`)}

                &.active {
                    background-color: ${props => props.theme.color.yellow};
                }
            }
        }
    }

    button {
        display: inline-flex;
        align-items: center;

        ${responsiveBreakpointDown(
            "mobile",
            `
            display: none;
        `
        )}

        svg {
            stroke-width: 3px;
            margin-right: 3px;
        }
    }
`

const DropdownLower = styled.div`
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

const SocialLink = styled.a`
    margin: 0 15px;

    &.twitter {
        transform: scale(1.3);
    }
`

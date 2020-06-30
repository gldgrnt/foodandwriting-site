import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { GridContainer } from "../../layout"
import { Button } from "../../ui"
import { responsiveBreakpointDown } from "../../../utils"

// Cookie name
const cookieName = "faw-allow-analytics"

export const CookieBanner = () => {
    // Initialise banner state
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        // Show banner if cookie is not present
        if (document.cookie.indexOf(cookieName) !== -1) {
            return
        }
        setHidden(false)
    }, [])

    // Set cookie function
    const setCookie = hasConsented => {
        // Set cookie
        document.cookie = `${cookieName}=${hasConsented};`
        // Start tracking
        if (hasConsented) {
            window.trackGoogleAnalytics()
        }
        // Hide banner
        setHidden(true)
    }

    return (
        !hidden && (
            <Banner>
                <GridContainer>
                    <BannerContent>
                        <Text>
                            This site uses cookies. <br />
                            Visit the <a href="/cookies">cookies page</a> for
                            more info.
                        </Text>
                        <Button secondary onClick={() => setCookie(true)}>
                            Allow cookies
                        </Button>
                        <Button secondary onClick={() => setCookie(false)}>
                            Decline
                        </Button>
                    </BannerContent>
                </GridContainer>
            </Banner>
        )
    )
}

const Banner = styled.div`
    display: block;
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.black};
    text-align: center;
    z-index: 10;

    br {
        display: none;

        ${responsiveBreakpointDown(
            "mobile",
            `
            display: block;
        `
        )}
    }
`

const BannerContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    ${responsiveBreakpointDown(
        "mobile",
        `
        flex-wrap: wrap;
    `
    )}

    button {
        margin: 0 5px;

        &:last-child {
            background: none;
        }
    }
`

const Text = styled.p`
    margin: 0 25px 0 0;

    ${responsiveBreakpointDown(
        "mobile",
        `
        flex-basis: 100%;
        margin: 0 0 15px;
    `
    )}
`

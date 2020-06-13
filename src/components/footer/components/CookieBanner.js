import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { GridContainer } from '../../layout'
import { Button } from '../../ui'
import { responsiveBreakpointDown } from '../../../utils'

const fawCookie = 'faw_cookie=1'

const allowCookies = () => {
    document.cookie = `${fawCookie};`
    document.cookie = 'gatsby-gdpr-google-analytics=true;'
    window.location.reload(true)
}

const declineCookies = () => {
    document.cookie = `${fawCookie};`
    window.location.reload(true)
}

export const CookieBanner = () => {
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        const cookies = document.cookie

        if (cookies.indexOf(fawCookie) !== -1) {
            return
        }

        setHidden(false)
    }, [])

    return (
        <Banner hidden={hidden}>
            <GridContainer>
                <BannerContent>
                    <Text>This site uses cookies. <br />Visit the <a href="/cookies">cookies page</a> for more info.</Text>
                    <Button secondary onClick={allowCookies}>Allow cookies</Button>
                    <Button secondary onClick={declineCookies}>Decline</Button>
                </BannerContent>
            </GridContainer>
        </Banner>
    )
}

const Banner = styled.div`
    display: ${props => props.hidden ? 'none' : 'block'};
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

        ${responsiveBreakpointDown('mobile', `
            display: block;
        `)}
    }
`

const BannerContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    ${responsiveBreakpointDown('mobile', `
        flex-wrap: wrap;
    `)}

    button {
        margin: 0 5px;

        &:last-child {
            background: none;
        }
    }
`

const Text = styled.p`
    margin: 0 25px 0 0;

    ${responsiveBreakpointDown('mobile', `
        flex-basis: 100%;
        margin: 0 0 15px;
    `)}
`
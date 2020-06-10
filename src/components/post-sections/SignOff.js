import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

/**
 * Sign off component
 */
export const SignOff = ({ maxWidth }) => {

    const { logo, alt } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "fandw-reduced.svg" }) {
                publicURL
            }
            alt: sanityConfig {
                siteTitle
            }
        }
    `)

    return (
        <SignOffWrapper maxWidth={maxWidth}>
            <Logo src={logo.publicURL} alt={alt.siteTitle} />
        </SignOffWrapper>
    )
}

/**
 * Styles
 */
const SignOffWrapper = styled.div`
    max-width: ${props => props.maxWidth};
    margin: auto;
    padding-top: 30px;
`

const Logo = styled.img`
    width: 50px;
    margin-right: auto;
`
import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

export const ReducedLogo = () => {

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
        <LinkWrapper to="/">
            <Image src={logo.publicURL} alt={alt.siteTitle} />
        </LinkWrapper>
    )
}

const LinkWrapper = styled(Link)`
    display: inline-flex;
`

const Image = styled.img`
    height: 15px;
    width: auto;
    margin: 0;
`
import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

export const Logo = () => {
    const { logo, alt } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "fandw-std.svg" }) {
                publicURL
            }
            alt: sanityConfig {
                siteTitle
            }
        }
    `)

    return (
        <LinkContainer to="/">
            <Image src={logo.publicURL} alt={alt.siteTitle} />
        </LinkContainer>
    )
}

const LinkContainer = styled(Link)`
    display: inline-flex;
`

const Image = styled.img`
    height: 18px;
    width: 125px;
    margin: 0;
`

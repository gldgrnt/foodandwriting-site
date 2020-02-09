import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

export const ReducedLogo = () => {

    const { logo, alt } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "fandw-reduced.svg" }) {
                publicURL
            }
            alt: site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <LinkWrapper to="/">
            <Image src={logo.publicURL} alt={alt.siteMetadata.title} />
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
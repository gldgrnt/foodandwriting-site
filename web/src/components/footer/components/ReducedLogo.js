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
        <LinkContainer to="/">
            <Image src={logo.publicURL} alt={alt.siteMetadata.title} />
        </LinkContainer>
    )
}

const LinkContainer = styled(Link)`
    display: inline-flex;
`

const Image = styled.img`
    height: 20px;
    width: auto;
    margin: 0;
`
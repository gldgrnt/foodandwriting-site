import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

export const Logo = () => {

    const { logo, alt } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "fandw-std.svg" }) {
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
    height: 18px;
    width: 125px;
    margin: 0;
`;
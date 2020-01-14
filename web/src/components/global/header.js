import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'


export default () => {

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
        <header>
            <ImageContainer>
                <img src={logo.publicURL} alt={alt.siteMetadata.title} />
            </ImageContainer>
        </header>
    )
}

const ImageContainer = styled.div`
    max-width: 300px;
`
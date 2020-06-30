import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { SmallCaps } from "../../ui"

export const Copyright = () => {
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
        <CopyrightWrapper>
            <SmallCaps size="small" color="black">
                &copy; 2020
            </SmallCaps>
            <Image src={logo.publicURL} alt={alt.siteTitle} />
        </CopyrightWrapper>
    )
}

const CopyrightWrapper = styled.div`
    display: flex;
    align-items: baseline;

    span {
        line-height: 1;
        white-space: nowrap;
        margin-right: 7px;
    }
`

const Image = styled.img`
    height: 12px;
    width: auto;
    margin: 0;
`

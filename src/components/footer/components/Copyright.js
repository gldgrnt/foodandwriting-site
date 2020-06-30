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
            <Image src={logo.publicURL} alt={alt.siteTitle} />
            <SmallCaps size="small" color="black">
                &copy; 2020
            </SmallCaps>
        </CopyrightWrapper>
    )
}

const CopyrightWrapper = styled.div`
    display: flex;
    align-items: baseline;

    > *:first-child {
        margin-right: 7px;
    }

    span {
        line-height: 1;
        white-space: nowrap;
    }
`

const Image = styled.img`
    height: 11px;
    width: auto;
    margin: 0;
`

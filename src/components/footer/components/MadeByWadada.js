import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

export const MadeByWadada = () => {

    const { logo } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "wadada.svg" }) {
                publicURL
            }
        }
    `)

    return (
        <LinkWrapper href="https://wadada-design.com" target="_blank">
            <Text>Site by </Text>
            <Image src={logo.publicURL} alt="Wadada design logo" />
        </LinkWrapper>
    )
}

const LinkWrapper = styled.a`
    display: inline-flex;

    &, &:hover, &:focus {
        text-decoration: none;
    }
`

const Text = styled.span`
    display: inline-block;
    font-size: ${props => props.theme.font.size.tiny};
    font-family: ${props => props.theme.font.family.sans};
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
`

const Image = styled.img`
    height: 15px;
    width: auto;
    margin: 0;
`
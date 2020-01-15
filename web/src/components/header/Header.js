import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'

import { Navigation } from './components'

const Header = () => {

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
        <Wrapper>
            <Container>
                <Link to="/">
                    <Logo src={logo.publicURL} alt={alt.siteMetadata.title} />
                </Link>

                <Navigation />
            </Container>
        </Wrapper>
    )
}

export { Header }

const Wrapper = styled.header`
    padding: 35px 0;
`

const Container = styled.div`
    max-width: 1375px;
    margin: auto;
`

const Logo = styled.img`
    height: 22px;
    width: auto;
    margin: 0;
`;

import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { StaticQuery, graphql, Link } from "gatsby"

import { GridContainer, GridRow, GridCol } from "../layout"
import { SmallCaps, Image } from "../ui"
import { responsiveBreakpointDown } from "../../utils"

/**
 * About component
 */
const AboutSection = ({
    data: {
        sanityAbout: { snippet, _rawSmallImage },
    },
}) => {
    const imgSizes = [{ width: 300, height: 300, mediaMin: 0 }]

    return (
        <GridContainer>
            <GridRow justify="center">
                <GridCol cols={{ monitor: 6, desktop: 7, tablet: 8 }}>
                    <AboutLinkWrapper
                        to="/about"
                        aria-label="Find out more about food &amp; writing"
                    >
                        <ImageWrapper>
                            <Image
                                fadeIn
                                source={_rawSmallImage}
                                sizes={imgSizes}
                                dpr={[1, 1.5]}
                            />
                        </ImageWrapper>
                        <TextWrapper>
                            <SmallCaps as="p" size="small">
                                About
                            </SmallCaps>
                            <Snippet>{snippet}</Snippet>
                            <SmallCaps link as="span" size="tiny">
                                Find out more
                            </SmallCaps>
                        </TextWrapper>
                    </AboutLinkWrapper>
                </GridCol>
            </GridRow>
        </GridContainer>
    )
}

export const About = props => (
    <StaticQuery
        query={query}
        render={data => <AboutSection data={data} {...props} />}
    />
)

/**
 * PropTypes
 */
AboutSection.propTypes = {
    data: PropTypes.shape({
        sanityAbout: PropTypes.shape({
            snippet: PropTypes.string.isRequired,
            _rawSmallImage: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
}

/**
 * Styles
 */
const AboutLinkWrapper = styled(Link)`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.color.whiteGrey};
    text-decoration: none;

    ${responsiveBreakpointDown(
    "mobile",
    `
        flex-wrap: wrap;
    `
)}

    &:hover,
    &:focus {
        img {
            transform: scale(1.05);
        }

        span:last-child {
            color: ${props => props.theme.color.black};
        }
    }
`

const ImageWrapper = styled.div`
    position: relative;
    min-width: 300px;
    padding-top: 300px;
    overflow: hidden;

    ${responsiveBreakpointDown(
    "tablet",
    `
        min-width: 250px;
        padding-top: 100%;
    `
)}

    ${responsiveBreakpointDown(
    "mobile",
    `
        width: 100%;
    `
)}
`

const TextWrapper = styled.div`
    padding: 0 80px;
    flex-grow: 1;
    line-height: 2;
    min-width: 300px;
    font-size: ${props => props.theme.font.size.increased};

    ${responsiveBreakpointDown(
    "laptop",
    `
        padding: 0 60px;
    `
)}

    ${responsiveBreakpointDown(
    "mobile",
    `
        min-width: 250px;
        padding: 20px;
    `
)}

    > *:not(:last-child) {
        margin-bottom: 15px;
    }
`

const Snippet = styled.p`
    ${responsiveBreakpointDown(
    "mobile",
    `
        font-size: 90%;
    `
)}
`

/**
 * Static query
 */
const query = graphql`
    query {
        sanityAbout {
            snippet
            _rawSmallImage(resolveReferences: { maxDepth: 10 })
        }
    }
`

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { SmallCaps, InternalLink } from '../ui'
import { responsiveBreakpointDown } from '../../utils'

/**
 * About component
 */
const AboutSection = ({ data: {sanityAbout: {snippet, smallImage}}, maxTextWidth }) => {
    
    return (
        <AboutWrapper maxTextWidth={maxTextWidth}>
            <ImageWrapper>
                <Img fluid={smallImage.asset.fluid} />
            </ImageWrapper>
            <TextWrapper>
                <SmallCaps as="p" size="small">About</SmallCaps>
                <p>{snippet}</p>
                <InternalLink primary to="/about">Read more</InternalLink>
            </TextWrapper>
        </AboutWrapper>
    )
}

export const About = props => (
    <StaticQuery query={query} render={ data => (
        <AboutSection data={data} {...props}/>
    )}/>
)

/**
 * PropTypes
 */
AboutSection.propTypes = {
    data: PropTypes.shape({
        sanityAbout: PropTypes.shape({
            snippet: PropTypes.string.isRequired,
            smallImage: PropTypes.shape({
                asset: PropTypes.shape({
                    fluid: PropTypes.object.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    maxTextWidth: PropTypes.string
}

/**
 * Styles
 */
const AboutWrapper = styled.div`
    display: flex;
    align-items: center;
    max-width: ${props => props.maxTextWidth};
    margin: auto;
    padding-top: 30px;

    ${responsiveBreakpointDown('mobile', `
        flex-wrap: wrap;
        padding: 0 15px;
    `)}
`

const ImageWrapper = styled.div`
    ${responsiveBreakpointDown('mobile', `
        display: none;
    `)}

    > * {
        height: 200px;
        width: 180px;
    }
`

const TextWrapper = styled.div`
    padding-left: 60px;
    flex-grow: 1;
    line-height: 2;
    min-width: 300px;
    font-size: ${props => props.theme.font.size.increased};

    ${responsiveBreakpointDown('mobile', `
        padding: 0;
    `)}

    > *:not(:last-child) {
        margin-bottom: 15px;
    }
`

/**
 * Static query
 */
const query = graphql`
    query {
        sanityAbout {
            snippet
            smallImage {
                asset {
                    fluid {
                        ...GatsbySanityImageFluid_noBase64
                    }
                }
            }
        }
    }
`
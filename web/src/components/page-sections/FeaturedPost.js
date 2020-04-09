import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image/withIEPolyfill'

import { GridContainer } from '../layout'
import { InternalLink, SmallCaps } from '../ui'
import { Link } from 'gatsby'
import { responsiveBreakpointDown } from '../../utils'

/**
 * FeaturedPost component
 */
export const FeaturedPost = ({ post: { title, featuredImage, recipeIntro, fullSlug, category: { singleName } }}) => {
    
    // Set up variables
    const caption = recipeIntro ? (recipeIntro.length > 160 ? recipeIntro.substr(0, 157) + '...' : recipeIntro.substr(0, 160)) : 'Curabitur lacinia at lectus ac sodales. Sed tristique faucibus odio eget rhoncus. Quisque mollis dapibus libero et sagittis. Suspendisse sollicitudin laoreet...'

    return (
        <GridContainer removeMobilePadding={true}>
            <Article>
                <ImageLinkWrapper to={fullSlug}>
                    <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={title} />
                </ImageLinkWrapper>

                <CaptionContainer>
                    <CaptionInner>
                        <SmallCaps as="p" size="small">Featured {singleName}</SmallCaps>
                        <InternalLink to={fullSlug} title>
                            <CaptionTitle>{title}</CaptionTitle>
                        </InternalLink>
                        <CaptionText>{caption}</CaptionText>
                        <InternalLink to={fullSlug} primary>View {singleName}</InternalLink>
                    </CaptionInner>
                </CaptionContainer>
            </Article>
        </GridContainer>
    )
}

/**
 * Proptypes
 */
FeaturedPost.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        category: PropTypes.shape({
            singleName: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            })
        }),
        featuredImage: PropTypes.object.isRequired,
        recipeIntro: PropTypes.string
    })
}

/**
 * Styles
 */
const Article = styled.article`
    display: flex;
    width: 100%;
    background: ${props => props.theme.color.whiteGrey};
    min-height: 700px;

    ${responsiveBreakpointDown('desktop', `
        min-height: 540px;
    `)}

    ${responsiveBreakpointDown('tablet', `
        min-height: 500px;
        background: transparent;
    `)}

    ${responsiveBreakpointDown('mobile', `
        min-height: calc(90vh - 65px);
    `)}
`

const ImageLinkWrapper = styled(Link)`
    position: relative;
    overflow: hidden;
    flex-basis: 50%;

    ${props => responsiveBreakpointDown('tablet', `
        position: absolute;
        top: 0;
        left: ${props.theme.grid.spacing}px;
        width: calc(100% - ${props.theme.grid.spacing * 2}px);
        height: 100%;
        z-index: 0;
        flex-basis: auto;
    `)}

    ${responsiveBreakpointDown('mobile', `
        left: 0;
        width: 100%;
    `)}
        
    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
    padding: 210px 0;

    ${responsiveBreakpointDown('desktop', `
        padding: 140px 0;
    `)}

    ${props => responsiveBreakpointDown('tablet', `
        position: relative;
        z-index: 2;
        flex-basis: 100%;
        padding: 60px;
        text-align: center;
        background: ${props.theme.color.blackOverlay};
    `)}

    ${responsiveBreakpointDown('mobile', `
        padding: 60px 30px;
    `)}
`

const CaptionInner = styled.div`
    width: 55%;

    & > * {
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }

    ${responsiveBreakpointDown('desktop', `width: 65%;`)}
    ${responsiveBreakpointDown('tablet', `
        display: flex;
        flex-direction: column;
        align-items: center;
        width: auto;
        color: white;

        > * {
            color: inherit !important;

            &::after,
            &:hover::after,
            &:focus::after {
                background: white;
            }
        }
    `)}

    ${props => responsiveBreakpointDown('mobile', `
        > p:first-child {
            font-size: ${props.theme.font.size.regular};
        }
    `)}
`

const CaptionTitle = styled.h2`
    font-size: ${props => props.theme.font.size.giant};

    ${props =>  responsiveBreakpointDown('desktop', `font-size: ${props.theme.font.size.huge};`)}
    ${props =>  responsiveBreakpointDown('tablet', `font-size: ${props.theme.font.size.giant};`)}
`

const CaptionText = styled.p`
    color: ${props => props.theme.color.darkGrey};

    ${responsiveBreakpointDown('desktop', `font-size: 0.9rem;`)}
    ${responsiveBreakpointDown('tablet', `display: none;`)}
`
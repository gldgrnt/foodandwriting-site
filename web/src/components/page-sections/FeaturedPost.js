import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { GridContainer } from '../layout'
import { InternalLink, SmallCaps } from '../ui'
import { Link } from 'gatsby'
import { responsiveBreakpointDown, getPostSlug } from '../../utils'

export const FeaturedPost = ({ post }) => {

    // Transform caption
    let caption
    if (post.recipeIntro.length > 160) {
        caption = `${post.recipeIntro.substr(0, 157)}...`
    } else {
        caption = post.recipeIntro.substr(0, 160)
    }

    // Slug
    const slug = getPostSlug(post)

    return (
        <GridContainer>
            <Article>
                <ImageLinkWrapper to={slug}>
                    <Img fluid={post.featuredImage.asset.fluid} alt={post.title} />
                </ImageLinkWrapper>

                <CaptionContainer>
                    <CaptionInner>
                        <SmallCaps as="p" size="small">Featured {post._type}</SmallCaps>
                        <InternalLink to={slug} title>
                            <CaptionTitle>{post.title}</CaptionTitle>
                        </InternalLink>
                        <CaptionText>{caption}</CaptionText>
                        <InternalLink to={slug} primary>View recipe</InternalLink>
                    </CaptionInner>
                </CaptionContainer>
            </Article>
        </GridContainer>
    )
}

FeaturedPost.propTypes = {
    post: PropTypes.object.isRequired
}

const Article = styled.article`
    display: flex;
    width: 100%;
`

const ImageLinkWrapper = styled(Link)`
    position: relative;
    overflow: hidden;
    flex-basis: 50%;
        
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
    background: ${props => props.theme.color.whiteGrey};
    padding: 210px 0;

    ${responsiveBreakpointDown('desktop', `
        padding: 140px 0;
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
`

const CaptionTitle = styled.h2`
    font-size: ${props => props.theme.font.size.giant};

    ${props =>  responsiveBreakpointDown('desktop', `font-size: ${props.theme.font.size.huge};`)}
`

const CaptionText = styled.p`
    color: ${props => props.theme.color.darkGrey};

    ${responsiveBreakpointDown('desktop', `font-size: 0.9rem;`)}
`
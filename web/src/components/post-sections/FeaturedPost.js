import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
                    <img src={post.featuredImage.asset.fluid.srcWebp} alt={post.title} />
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
        
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
    width: 65%;

    & > * {
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }
`

const CaptionTitle = styled.h2`
    font-size: ${props => props.theme.font.size.huge};
`

const CaptionText = styled.p`
    font-size: 0.9rem;
    color: ${props => props.theme.color.mediumGrey};
`
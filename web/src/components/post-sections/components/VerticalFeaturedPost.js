import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { InternalLink } from '../../ui'
import { getPostSlug } from '../../../utils'

export const VerticalFeaturedPost = ({ post }) => {

    // Slug
    const slug = getPostSlug(post)

    return (
        <ArticleWrapper>
            <InternalLink to={slug}>
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                <CaptionWrapper>
                    <Title>{post.title}</Title>
                    <span>Read more</span>
                </CaptionWrapper>
            </InternalLink>
        </ArticleWrapper>
    )
}

VerticalFeaturedPost.propTypes = {
    post: PropTypes.object.isRequired
}

const ArticleWrapper = styled.article`
    width: 500px;
    background: white;
`

const StyledImage = styled.img`
    display: block;
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-bottom: 0;
`

const CaptionWrapper = styled.div`
    padding: 30px 0;
    text-align: center;
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin: 0 0 15px;
`
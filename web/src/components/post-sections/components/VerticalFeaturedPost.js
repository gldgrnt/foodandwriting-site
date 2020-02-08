import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { InternalLink, SmallCaps } from '../../ui'
import { getPostSlug, responsiveBreakpointDown } from '../../../utils'

export const VerticalFeaturedPost = ({ post }) => {

    // Slug
    const slug = getPostSlug(post)

    return (
        <ArticleWrapper>
            <InternalLink to={slug}>
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                <CaptionWrapper>
                    <Title>{post.title}</Title>
                    <SmallCaps as="span" size="tiny" color="mediumGrey" link>Read more</SmallCaps>
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

    ${responsiveBreakpointDown('desktop', `
        width: 440px;
    `)}

    &:hover,
    &:focus {
        h3 {
            text-decoration: underline;
        }

        span {
            color: ${props => props.theme.color.black};

            &::after {
                background: ${props => props.theme.color.black};
            }
        }
    }
`

const StyledImage = styled.img`
    display: block;
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-bottom: 0;

    ${responsiveBreakpointDown('desktop', `
        height: 320px;
    `)}
`

const CaptionWrapper = styled.div`
    padding: 25px 20px;
    text-align: center;
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    margin: 0 0 10px;
`
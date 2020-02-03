import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { InternalLink } from '../../ui'
import { getPostSlug } from '../../../utils'

export const VerticalPost = ({ post }) => {

    // Slug
    const slug = getPostSlug(post)

    return (
        <StyledArticle>
            <ArticleLinkWrapper href={slug}>
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                <StyledTitle>{post.title}</StyledTitle>
            </ArticleLinkWrapper>
            <InternalLink to={slug} primary>View recipe</InternalLink>
        </StyledArticle>
    )
}

VerticalPost.prototypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.boolean
}

const StyledArticle = styled.article`
    max-width: ${props => (props.theme.grid.breakpoints.monitor.minScreenWidth / 3) - 120}px;

    @media screen and (max-width: ${props => props.theme.grid.breakpoints.desktop.maxScreenWidth}px) {
        max-width: ${props => (props.theme.grid.breakpoints.desktop.minScreenWidth / 3) - 60}px;
    }
`

const ArticleLinkWrapper = styled.a`
    text-decoration: none;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }

    &,
    > *:not(:last-child) {
        margin-bottom: 20px;
    }
`

const StyledImage = styled.img`
    width: 100%;
`

const StyledTitle = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
`
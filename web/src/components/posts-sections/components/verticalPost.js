import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { Button } from '../../ui'

export const VerticalPost = ({ post }) => {

    const postLink = `/${post.slug.current}`


    return (
        <article>
            <ArticleLinkWrapper to={postLink}>
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                <StyledTitle>{post.title}</StyledTitle>
            </ArticleLinkWrapper>
            <Button link={postLink}>View recipe</Button>
        </article>
    )
}

VerticalPost.prototypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.boolean
}

const ArticleLinkWrapper = styled(Link)`
    text-decoration: none;

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
    height: 450px;
    width: 360px;
`

const StyledTitle = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
`
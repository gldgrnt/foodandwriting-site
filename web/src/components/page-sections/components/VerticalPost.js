import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { SmallCaps } from '../../ui'
import { getPostSlug } from '../../../utils'

export const VerticalPost = ({ post }) => {

    // Slug
    const slug = getPostSlug(post)

    return (
        <Article>
            <LinkWrapper href={slug}>
                <ImageWrapper>
                    <Image src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                </ImageWrapper>
                <Title>{post.title}</Title>
                <SmallCaps size="tiny" color="mediumGrey" link>View recipe</SmallCaps>
            </LinkWrapper>
        </Article>
    )
}

VerticalPost.prototypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.boolean
}

const Article = styled.article`
    max-width: ${props => (props.theme.grid.breakpoints.monitor.minScreenWidth / 3) - 120}px;

    @media screen and (max-width: ${props => props.theme.grid.breakpoints.desktop.maxScreenWidth}px) {
        max-width: ${props => (props.theme.grid.breakpoints.desktop.minScreenWidth / 3) - 60}px;
    }
`

const LinkWrapper = styled.a`
    text-decoration: none;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: underline;

        span {
            color: ${props => props.theme.color.black};

            &::after {
                background: ${props => props.theme.color.black};
            }
        }
    }
`

const ImageWrapper = styled.div`
    position: relative;
    padding-top: 120%;
    margin-bottom: 20px;
`

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin-bottom: 10px;
`
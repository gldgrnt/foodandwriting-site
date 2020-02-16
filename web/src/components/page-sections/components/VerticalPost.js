import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { SmallCaps } from '../../ui'
import { getPostSlug, responsiveBreakpointDown } from '../../../utils'

export const VerticalPost = ({ post: {postMeta, title, featuredImage} }) => {

    // Slug
    const slug = getPostSlug(postMeta)

    return (
        <Article>
            <LinkWrapper href={slug}>
                <ImageWrapper>
                    <Img fluid={featuredImage.asset.fluid} alt="placeholder" />
                </ImageWrapper>
                <Title>{title}</Title>
                <SmallCaps size="tiny" color="mediumGrey" link>View recipe</SmallCaps>
            </LinkWrapper>
        </Article>
    )
}

VerticalPost.prototypes = {
    post: PropTypes.shape({
        postMeta: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.object.isRequired
    }).isRequired,
}

const Article = styled.article`
    max-width: ${props => (props.theme.grid.breakpoints.monitor.minScreenWidth / 3) - 120}px;

    ${props => responsiveBreakpointDown('desktop', `
        max-width: ${(props.theme.grid.breakpoints.desktop.minScreenWidth / 3) - 60}px;
    `)}

    ${props => responsiveBreakpointDown('laptop', `
        max-width: ${(props.theme.grid.breakpoints.laptop.minScreenWidth / 3) - 60}px;
    `)}

    ${responsiveBreakpointDown('mobile', `
        max-width: none;
        width: calc(100% - 40px);
        margin: auto;
    `)}
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

    ${responsiveBreakpointDown('tablet', `
        span {
            display: none;
        }
    `)}
`

const ImageWrapper = styled.div`
    position: relative;
    padding-top: 140%;
    margin-bottom: 20px;

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin-bottom: 10px;

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.regular};
    `)}
`
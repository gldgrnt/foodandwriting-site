import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { SmallCaps } from '../../ui'
import { responsiveBreakpointDown } from '../../../utils'

export const VerticalSliderPost = ({ post: {title, fullSlug, featuredImage} }) => {
    return (
        <LinkWrapper to={fullSlug}>
            <Article>
                <ImageWrapper>
                    <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={featuredImage.alt || title} />
                </ImageWrapper>

                <Title>{title}</Title>
                <SmallCaps size="tiny" color="mediumGrey" link>View recipe</SmallCaps>
            </Article>
        </LinkWrapper>
    )
}

VerticalSliderPost.prototypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.object.isRequired
    }).isRequired,
}

const LinkWrapper = styled(Link)`
    text-decoration: none;
    outline: none;
    max-width: ${props => (props.theme.grid.breakpoints.monitor.minScreenWidth / 3) - 120}px;

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

    ${props => responsiveBreakpointDown('desktop', `
        max-width: ${(props.theme.grid.breakpoints.desktop.minScreenWidth / 3) - 60}px;
    `)}

    ${props => responsiveBreakpointDown('laptop', `
        max-width: ${(props.theme.grid.breakpoints.laptop.minScreenWidth / 3) - 60}px;

        span {
            display: none;
        }
    `)}

    ${responsiveBreakpointDown('mobile', `
        max-width: none;
        width: calc(100% - 30px);
        margin: auto;
    `)}
`

const Article = styled.article`
    width: 100%;
`

const ImageWrapper = styled.div`
    position: relative;
    padding-top: 135%;
    margin-bottom: 20px;
    background: ${props => props.theme.color.whiteGrey};
    
    ${responsiveBreakpointDown('mobile', `padding-top: 140%;`)}

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    margin-bottom: 10px;
    white-space: normal;

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.regular};
    `)}
`
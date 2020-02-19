import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { SmallCaps } from '../../ui'
import { getPostSlug, responsiveBreakpointDown } from '../../../utils'

export const VerticalFeaturedPost = ({ post: {title, postMeta, featuredImage} }) => {

    // Slug
    const slug = getPostSlug(postMeta)
    
    return (
        <StyledLink to={slug}>
            <Article>
                <ImageWrapper>
                    <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={featuredImage.alt || title}/>
                </ImageWrapper>

                <CaptionWrapper>
                    <CaptionTitle>{title}</CaptionTitle>
                    <SmallCaps as="span" size="tiny" color="mediumGrey" link>Read more</SmallCaps>
                </CaptionWrapper>
            </Article>
        </StyledLink>
    )
}

VerticalFeaturedPost.prototypes = {
    post: PropTypes.shape({
        postMeta: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.object.isRequired
    }).isRequired,
}

const StyledLink = styled(Link)`
    text-decoration: none;
    
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

const Article = styled.article`
    width: 560px;
    background: white;

    ${responsiveBreakpointDown('desktop', `width: 480px;`)}
    ${responsiveBreakpointDown('laptop', `width: 420px;`)}
    ${responsiveBreakpointDown('tablet', `width: calc(50% - 30px);`)}
    ${responsiveBreakpointDown('mobile', `width: 100%`)}

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

const ImageWrapper = styled.div`
    height: 500px;

    ${responsiveBreakpointDown('desktop', `height: 420px;`)}
    ${responsiveBreakpointDown('laptop', `height: 360px;`)}
    ${responsiveBreakpointDown('tablet', `height: 300px;`)}
    ${responsiveBreakpointDown('mobile', `height: 360px;`)}

    > * {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-bottom: 0;
        background: ${props => props.theme.color.whiteGrey};
    }
`

const CaptionWrapper = styled.div`
    padding: 25px 20px;
    text-align: center;

    ${props => responsiveBreakpointDown('tablet', `
        span {
            display: none;
        }
    `)}
`

const CaptionTitle = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin: 0 0 10px;

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.regular};
        margin: 0;    
    `)}
`
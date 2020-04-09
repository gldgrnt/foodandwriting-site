import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { SmallCaps } from '../../ui'
import { responsiveBreakpointDown } from '../../../utils'

/**
 * VerticalFeaturedPost component
 */
export const VerticalFeaturedPost = ({ post: { title, fullSlug, featuredImage, category: { singleName }} }) => {
    
    return (
        <StyledLink to={fullSlug}>
            <Article>
                <ImageWrapper>
                    <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={featuredImage.alt || title}/>
                </ImageWrapper>

                <CaptionWrapper>
                    <CaptionTitle>{title}</CaptionTitle>
                    <SmallCaps as="span" size="tiny" color="mediumGrey" link>View {singleName}</SmallCaps>
                </CaptionWrapper>
            </Article>
        </StyledLink>
    )
}

/**
 * Proptypes
 */
VerticalFeaturedPost.prototypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
            asset: PropTypes.object.isRequired,
        }).isRequired,
        category: PropTypes.shape({
            singleName: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

const StyledLink = styled(Link)`
    display: inline-block;
    width: 560px;
    text-decoration: none;
    
    ${responsiveBreakpointDown('desktop', `width: 480px;`)}
    ${responsiveBreakpointDown('laptop', `width: 420px;`)}
    ${responsiveBreakpointDown('tablet', `width: calc(50% - 30px);`)}
    ${responsiveBreakpointDown('mobile', `width: 100%;`)}
    
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
    width: 100%;
    background: white;

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
    font-size: ${props => props.theme.font.size.medium};
    margin: 0 0 10px;

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.regular};
        margin: 0;    
    `)}
`
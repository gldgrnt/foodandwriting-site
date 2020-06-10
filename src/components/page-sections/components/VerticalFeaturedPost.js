import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { SmallCaps, Image } from '../../ui'
import { responsiveBreakpointDown } from '../../../utils'

/**
 * VerticalFeaturedPost component
 */
export const VerticalFeaturedPost = ({ post: { title, fullSlug, _rawFeaturedImage, category: { singleName } } }) => {

    const imageSizes = [
        { width: 560, height: 500, mediaMin: 1600 },
        { width: 480, height: 420, mediaMin: 1200 },
        { width: 420, height: 360, mediaMin: 1000 },
        { width: 335, height: 300, mediaMin: 768 },
        { width: 400, height: 360, mediaMin: 0 },
    ]

    return (
        <StyledLink to={fullSlug}>
            <Article>
                <ImageWrapper>
                    <Image fadeIn source={_rawFeaturedImage} sizes={imageSizes} />
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

        img {
            transform: scale(1.03);
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
    position: relative;
    height: 500px;
    overflow: hidden;

    ${responsiveBreakpointDown('desktop', `height: 420px;`)}
    ${responsiveBreakpointDown('laptop', `height: 360px;`)}
    ${responsiveBreakpointDown('tablet', `height: 300px;`)}
    ${responsiveBreakpointDown('mobile', `height: 360px;`)}
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
        font-size: ${props.theme.font.size.increased};
        margin: 0;    
    `)}
`
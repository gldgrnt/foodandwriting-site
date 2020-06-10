import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { SmallCaps, Image } from '../../ui'
import { responsiveBreakpointDown, getPostDate } from '../../../utils'

/**
 * HorizontalPost component
 */
export const HorizontalPost = ({ post: { title, date, fullSlug, _rawFeaturedImage, category: { singleName } } }) => {

    const postDate = getPostDate(date)
    const imageSizes = [
        { width: 320, height: 280, mediaMin: 1600 },
        { width: 260, height: 200, mediaMin: 1200 },
        { width: 320, height: 280, mediaMin: 1000 },
        { width: 260, height: 200, mediaMin: 768 },
        { width: 460, height: 280, mediaMin: 0 },
    ]

    return (
        <StyledLink to={fullSlug}>
            <Article>
                <ImageWrapper>
                    {_rawFeaturedImage ? <Image fadeIn source={_rawFeaturedImage} sizes={imageSizes} /> : <div></div>}
                </ImageWrapper>

                <CaptionWrapper>
                    <SmallCaps as="time" size="small" datetime={postDate.raw}>{postDate.formatted}</SmallCaps>
                    <Title>{title}</Title>
                    <SmallCaps size="tiny" color="mediumGrey" link>View {singleName}</SmallCaps>
                </CaptionWrapper>
            </Article>
        </StyledLink>
    )
}

/**
 * PropTypes
 */
HorizontalPost.prototypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
            asset: PropTypes.object.isRequired,
        }).isRequired,
        category: PropTypes.shape({
            singleName: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
}

/**
 * Styles
 */
const StyledLink = styled(Link)`
    display: inline-block;
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

        img {
            transform: scale(1.03);
        }
    }
`

const Article = styled.article`
    display: flex;
    align-items: center;
    text-decoration: none;

    ${responsiveBreakpointDown('mobile', `
        flex-wrap: wrap;

        > * {
            flex-basis: 100%;
        }
    `)}
`

const ImageWrapper = styled.div`
    position: relative;
    height: 280px;
    min-width: 320px;
    background: ${props => props.theme.color.whiteGrey};
    overflow: hidden;

    ${responsiveBreakpointDown('desktop', `
        height: 200px;
        min-width: 260px;
    `)}

    ${responsiveBreakpointDown('laptop', `
        height: 280px;
        min-width: 320px;
    `)}

    ${responsiveBreakpointDown('tablet', `
        height: 200px;
        min-width: 260px;
    `)}

    ${responsiveBreakpointDown('mobile', `
        width: 100%;
        min-width: none;
        padding-top: 60%;
    `)}
`

const CaptionWrapper = styled.div`
    flex-grow: 1;
    padding: 0 60px;

    ${responsiveBreakpointDown('desktop', `padding: 0 10px 0 40px;`)}
    ${responsiveBreakpointDown('mobile', `padding: 15px 0 0;`)}
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    line-height: 1.75;
    margin: 10px 0 15px;

    ${props => responsiveBreakpointDown('desktop', `
        font-size: ${props.theme.font.size.increased};
    `)}
`
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { SmallCaps } from '../../ui'
import { responsiveBreakpointDown, getPostDate } from '../../../utils'

/**
 * HorizontalPost component
 */
export const HorizontalPost = ({ post: { title, date, fullSlug, featuredImage, category: { singleName } } }) => {

    const postDate = getPostDate(date)

    return (
        <StyledLink to={fullSlug}>
            <Article>
                <ImageWrapper>
                    {featuredImage ? <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={featuredImage.alt || title} /> : <div></div>}
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

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
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
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'

import { getPostSlug, getPostDate, responsiveBreakpointDown, getFluidPropsFromId } from '../../utils'
import { SmallCaps } from '../ui'

export const ArchivePost = ({ post: {title, postMeta, featuredImage}, imgHeight, showDate = true }) => {

    const slug = getPostSlug(postMeta)
    const categoryName = postMeta.category.categoryOptions.singleName
    const date = getPostDate(postMeta.date)

    const fluid = featuredImage !== null ? (featuredImage.asset.hasOwnProperty('fluid') ? featuredImage.asset.fluid : getFluidPropsFromId(featuredImage.asset._ref)) : false

    return (
        <StyledLink to={slug}>
            <article>
                <ImageWrapper imgHeight={imgHeight}>
                    {fluid? <Img fluid={fluid} /> : <div></div>}
                </ImageWrapper>
                { showDate && 
                    <SmallCaps as="time" size="small" datetime={date.faw}>{date.formatted}</SmallCaps> }
                <Title>{title}</Title>
                <SmallCaps size="tiny" link>View {categoryName}</SmallCaps>
            </article>
        </StyledLink>
    )
}

ArchivePost.prototypes = {
    post: PropTypes.shape({
        postMeta: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.object.isRequired
    }).isRequired,
    imgHeight: PropTypes.number,
    showDate: PropTypes.bool
}

const StyledLink = styled(Link)`
    width: calc((100% / 3) - (160px / 3));
    text-decoration: none;
    outline: none;

    ${responsiveBreakpointDown('desktop', `width: calc((100% / 3) - (120px / 3));`)}
    ${responsiveBreakpointDown('laptop', `width: calc((100% / 3) - (80px / 3));`)}
    ${responsiveBreakpointDown('tablet', `width: calc((100% / 2) - (40px / 2));`)}
    ${responsiveBreakpointDown('mobile', `width: 100%;`)}

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
    background: ${props => props.theme.color.whiteGrey};
    padding-top: ${props => props.imgHeight}%;
    margin-bottom: 15px;
    
    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const Title = styled.h2`
    font-size: ${props => props.theme.font.size.medium};
    margin-bottom: 15px;
    padding-top: 5px;
    padding-right: 30px;
`
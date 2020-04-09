import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'

import { getPostDate, responsiveBreakpointDown, getFluidPropsFromId } from '../../../utils'
import { SmallCaps } from '../../ui'

/**
 * ArchivePost component
 */
export const ArchivePost = ({ post: {title, date, fullSlug, featuredImage, category: { singleName, categoryType }}, imgHeight, showCategory = false }) => {

    const postDate = getPostDate(date)
    const fluid = featuredImage !== null && featuredImage.hasOwnProperty('asset') ? 
        (featuredImage.asset.hasOwnProperty('fluid') ? featuredImage.asset.fluid : getFluidPropsFromId(featuredImage.asset._ref)) : false
    const showDate = categoryType === 'Normal'

    return (
        <StyledLink to={fullSlug}>
            <article>
                <ImageWrapper imgHeight={imgHeight}>
                    {fluid ? <Img fluid={fluid} /> : <div></div>}
                </ImageWrapper>
                
                { (showDate || showCategory) &&
                    <MetaWrapper>
                        { showCategory && <SmallCaps size="small">{singleName}</SmallCaps> }
                        { showDate && <SmallCaps as="time" size="small" datetime={postDate.raw}>{postDate.formatted}</SmallCaps> }
                    </MetaWrapper>
                }
                
                <Title>{title}</Title>
                <SmallCaps size="tiny" link>View {singleName}</SmallCaps>
            </article>
        </StyledLink>
    )
}

/**
 * Proptypes
 */
ArchivePost.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
            asset: PropTypes.object
        })
    }),
    imgHeight: PropTypes.number.isRequired,
    showCategory: PropTypes.bool
}

/**
 * Styles
 */
const StyledLink = styled(Link)`
    width: calc((100% / 3) - (160px / 3));
    text-decoration: none;
    outline: none;

    ${responsiveBreakpointDown('desktop', `width: calc((100% / 3) - (120px / 3));`)}
    ${responsiveBreakpointDown('laptop', `width: calc((100% / 2) - (80px / 2));`)}
    ${responsiveBreakpointDown('tablet', `width: calc((100% / 2) - (40px / 2));`)}
    ${responsiveBreakpointDown('mobile', `width: 100%;`)}

    &:hover,
    &:focus {

        article {
            h2 {
                text-decoration: underline;
            }
            
            > span {
                color: ${props => props.theme.color.black};

                &::after {
                    background: ${props => props.theme.color.black};
                }
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
    background: ${props => props.theme.color.lightGreyOverlay};
    padding-top: ${props => props.imgHeight}%;
    margin-bottom: 20px;
    
    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const MetaWrapper = styled.div`
    display: flex;
    align-items: center;

    > *:not(:first-child) {
        position: relative;
        margin-left: 10px;

        &::before {
            content: ' · ';
            position: absolute;
            left: -6px; 
        }
    }
`

const Title = styled.h2`
    font-size: ${props => props.theme.font.size.medium};
    margin-bottom: 20px;
    padding-top: 5px;
    padding-right: 30px;
`
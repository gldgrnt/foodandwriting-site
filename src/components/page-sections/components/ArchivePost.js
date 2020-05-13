import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'

import { responsiveBreakpointDown, getFluidPropsFromFeaturedImage, parseReadyInString } from '../../../utils'
import { SmallCaps, PostMeta } from '../../ui'

/**
 * Archive post component
 */
export const ArchivePost = ({ post: { title, date, fullSlug, featuredImage, category: { singleName }, content }, isRecipe }) => {

    // Set up variables
    const fluid = getFluidPropsFromFeaturedImage(featuredImage)
    let recipeMeta = []

    if (isRecipe) {
        const { serves, readyIn } = content[0]
        recipeMeta = [`Serves ${serves}`, parseReadyInString(readyIn)]
    }

    return (
        <StyledLink to={fullSlug}>
            <article>
                <ImageWrapper tallImage={isRecipe}>
                    {fluid ? <Img fluid={fluid} /> : <div></div>}
                </ImageWrapper>

                {isRecipe ? <PostMeta meta={recipeMeta} /> : <PostMeta date={date} />}

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
        article > span {
            display: none;
        }
    `)}
`

const ImageWrapper = styled.div`
    position: relative;
    background: ${props => props.theme.color.lightGreyOverlay};
    padding-top: ${props => props.tallImage ? '120%' : '67%'};
    margin-bottom: 20px;
    
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
    margin-bottom: 10px;
    padding-top: 5px;
    padding-right: 30px;
`
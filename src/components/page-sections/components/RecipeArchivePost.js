import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'
import _ from 'lodash'

import { responsiveBreakpointDown, getFluidPropsFromId, parseReadyInString } from '../../../utils'
import { SmallCaps, PostMeta } from '../../ui'

/**
 * RecipeArchivePost component
 */
export const RecipeArchivePost = ({ post: { title, fullSlug, featuredImage, category: { singleName }, content } }) => {

    const { serves, readyIn } = content[0]
    const humanReadyIn = parseReadyInString(readyIn)

    const fluid = !_.isNull(featuredImage) && _.hasIn(featuredImage, 'asset')
        ? (_.hasIn(featuredImage, 'asset.fluid')
            ? featuredImage.asset.fluid
            : getFluidPropsFromId(featuredImage.asset._ref)
        )
        : false

    return (
        <StyledLink to={fullSlug}>
            <article>
                <ImageWrapper>
                    {fluid ? <Img fluid={fluid} /> : <div></div>}
                </ImageWrapper>

                <PostMeta meta={[`Serves ${serves}`, humanReadyIn]} />

                <Title>{title}</Title>
                <SmallCaps size="tiny" link>View {singleName}</SmallCaps>
            </article>
        </StyledLink>
    )
}

/**
 * Proptypes
 */
RecipeArchivePost.propTypes = {
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
    padding-top: 120%;
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
    margin-bottom: 20px;
    padding-top: 5px;
    padding-right: 30px;
`
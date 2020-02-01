import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { GridContainer } from '../layout'
import { InternalLink, SmallCaps } from '../ui'
import { Link } from 'gatsby'
import { responsiveBreakpointDown } from '../../utils'

export const FeaturedPost = ({ post }) => {

    // Transform caption
    let caption
    if (post.recipeIntro.length > 160) {
        caption = `${post.recipeIntro.substr(0, 157)}...`
    } else {
        caption = post.recipeIntro.substr(0, 160)
    }

    const postLink = `/${post.slug.current}`

    return (
        <GridContainer>
            <ImageLinkContainer to={postLink}>
                <img src={post.featuredImage.asset.fluid.srcWebp} alt={post.title} />
            </ImageLinkContainer>

            <CaptionContainer>
                <CaptionInner>
                    <SmallCaps as="p" size="small">Featured {post._type}</SmallCaps>
                    <InternalLink to={postLink} title>
                        <h2>{post.title}</h2>
                    </InternalLink>
                    <p>{caption}</p>
                    <InternalLink to={postLink} primary>View recipe</InternalLink>
                </CaptionInner>
            </CaptionContainer>
        </GridContainer>
    )
}

FeaturedPost.propTypes = {
    post: PropTypes.object.isRequired
}

/* Styles */
const ImageLinkContainer = styled(Link)`
    position: relative;
    overflow: hidden;
    flex-basis: 50%;
        
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
    background: ${props => props.theme.color.whiteGrey};
    padding: 210px 0;

    ${responsiveBreakpointDown('desktop', `
        padding: 160px 0;
    `)}
`

const CaptionInner = styled.div`
    width: 60%;

    & > * {
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }
`
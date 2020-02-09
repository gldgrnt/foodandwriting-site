import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { SmallCaps } from '../../ui'
import { getPostSlug, responsiveBreakpointDown } from '../../../utils'

export const VerticalFeaturedPost = ({ post }) => {

    // Slug
    const slug = getPostSlug(post)

    return (
        <Article>
            <StyledLink to={slug}>
                <Image src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
                <CaptionWrapper>
                    <CaptionTitle>{post.title}</CaptionTitle>
                    <SmallCaps as="span" size="tiny" color="mediumGrey" link>Read more</SmallCaps>
                </CaptionWrapper>
            </StyledLink>
        </Article>
    )
}

VerticalFeaturedPost.propTypes = {
    post: PropTypes.object.isRequired
}

const Article = styled.article`
    width: 500px;
    background: white;

    ${responsiveBreakpointDown('desktop', `
        width: 480px;
    `)}

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

const Image = styled.img`
    display: block;
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-bottom: 0;

    ${responsiveBreakpointDown('desktop', `
        height: 350px;
    `)}
`

const CaptionWrapper = styled.div`
    padding: 25px 20px;
    text-align: center;
`

const CaptionTitle = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin: 0 0 10px;
`
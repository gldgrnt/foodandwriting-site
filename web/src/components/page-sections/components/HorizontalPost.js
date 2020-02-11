import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { SmallCaps } from '../../ui'
import { responsiveBreakpointDown, getPostSlug } from '../../../utils'


export const HorizontalPost = ({ post }) => {

    // Create human readable date
    const date = new Date(post._createdAt)
    const sanitizedDate = `${date.getDate()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`

    // Slug 
    const slug = getPostSlug(post)

    return (
        <article>
            <StyledLink to={slug}>
                <Image src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />

                <CaptionWrapper>
                    <SmallCaps as="time" size="small" datetime={post._createdAt}>{sanitizedDate}</SmallCaps>
                    <CaptionTitle>{post.title}</CaptionTitle>
                    <SmallCaps size="tiny" color="mediumGrey" link>Read more</SmallCaps>
                </CaptionWrapper>
            </StyledLink>
        </article>
    )
}

HorizontalPost.prototypes = {
    post: PropTypes.object.isRequired
}

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
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
    height: 280px;
    width: 320px;
    object-fit: cover;
    margin: 0;

    ${responsiveBreakpointDown('desktop', `
        height: 200px;
        width: 260px;
    `)}
`

const CaptionWrapper = styled.div`
    flex-grow: 1;
    padding: 0 60px;

    ${props => responsiveBreakpointDown('desktop', `
        padding: 0 10px 0 40px;
    `)}
`

const CaptionTitle = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    line-height: 1.75;
    margin: 15px 0 10px;

    ${props => responsiveBreakpointDown('desktop', `
        font-size: ${props.theme.font.size.increased};
    `)}
`
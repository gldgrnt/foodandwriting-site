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
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />

                <CaptionWrapper>
                    <SmallCaps as="time" size="small" datetime={post._createdAt}>{sanitizedDate}</SmallCaps>
                    <Title>{post.title}</Title>
                    <StyledSpan>Read more</StyledSpan>
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

const StyledImage = styled.img`
    display: block;
    height: 280px;
    width: 320px;
    object-fit: cover;
    margin: 0;

    ${responsiveBreakpointDown('desktop', `
        height: 210px;
        width: 240px;
    `)}
`

const CaptionWrapper = styled.div`
    flex-grow: 1;
    padding: 0 60px;

    ${responsiveBreakpointDown('desktop', `
        font-size: 40px;
    `)}

    > *:not(:last-child) {
        margin-bottom: 15px;
    }
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    line-height: 1.75;

    ${responsiveBreakpointDown('desktop', `
        font-size: ${props => props.theme.font.size.increased};
    `)}
`

const StyledSpan = styled.span`
    display: inline-block;
    position: relative;
    font-family: ${props => props.theme.font.family.sans};
    font-size: ${props => props.theme.font.size.tiny};
    font-weight: bold;
    text-decoration: none;
    color: ${props => props.theme.color.mediumGrey};
    text-transform: uppercase;
    
    &,
    &::after {
        transition: ${props => props.theme.transition.fast};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 0;
        height: 1px;
        width: 100%;
        background: ${props => props.theme.color.mediumGrey}
    }
`
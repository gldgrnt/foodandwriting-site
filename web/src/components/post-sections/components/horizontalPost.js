import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { SmallCaps, InternalLink } from '../../ui'

export const HorizontalPost = ({ post }) => {

    // Create human readable date
    const date = new Date(post._createdAt)
    const sanitizedDate = `${date.getDate()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`

    return (
        <article>
            <StyledLink to="/">
                <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />

                <CaptionWrapper>
                    <SmallCaps as="time" size="small" datetime={post._createdAt}>{sanitizedDate}</SmallCaps>
                    <StyledTitle>{post.title}</StyledTitle>
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
    height: 200px;
    width: 240px;
    object-fit: cover;
    margin: 0;
`

const CaptionWrapper = styled.div`
    flex-grow: 1;
    padding-left: 40px;
    padding-right: 20px;

    > *:not(:last-child) {
        margin-bottom: 15px;
    }
`

const StyledTitle = styled.h3`
    font-size: ${props => props.theme.font.size.regular};
    line-height: 1.75;
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
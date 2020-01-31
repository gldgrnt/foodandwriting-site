import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GridContainer } from '../layout'
import { Button, SmallCaps } from '../ui'
import { Link } from 'gatsby'

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
        <StyledSection>
            <GridContainer>
                <ImageLinkContainer to={postLink}>
                    <img src={post.featuredImage.asset.fluid.srcWebp} alt={post.title} />
                </ImageLinkContainer>

                <CaptionContainer>
                    <CaptionInner>
                        <SmallCaps as="p" size="small">Featured {post._type}</SmallCaps>
                        <StyledTitleLink to={postLink}>
                            <h2>{post.title}</h2>
                        </StyledTitleLink>
                        <p>{caption}</p>
                        <Button link={postLink}>View recipe</Button>
                    </CaptionInner>
                </CaptionContainer>
            </GridContainer>
        </StyledSection>
    )
}

FeaturedPost.propTypes = {
    post: PropTypes.object.isRequired
}

/* Styles */
const StyledSection = styled.section`
    padding: 2rem 0 5rem;
`

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

    @media screen and (max-width: ${props => props.theme.grid.breakpoints[0] - 0.0001}px) {
        padding: 150px 0;
        min-height: 550px;
    }
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

const StyledTitleLink = styled(Link)`
    display: inline-block;
    color: ${props => props.theme.color.black};
    text-decoration: none;
    transition: text-decoration ${props => props.theme.transition.fast};
    
    > * {
        margin: 0;
    }

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`
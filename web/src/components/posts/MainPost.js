import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GridContainer } from '../layout'
import { SmallTitle, Button } from '../ui'

export const MainPost = ({ post }) => {

    // console.log(post)

    // Transform caption
    let caption
    if (post.recipeIntro.length > 160) {
        caption = `${post.recipeIntro.substr(0, 157)}...`
        console.log(caption)
    } else {
        caption = post.recipeIntro.substr(0, 160)
    }

    return (
        <StyledSection>
            <GridContainer>
                <ImageContainer>
                    <img src={post.featuredImage.asset.fluid.srcWebp} alt={post.title} />
                </ImageContainer>

                <CaptionContainer>
                    <CaptionInner>
                        <SmallTitle>
                            <span>Featured {post._type}</span>
                        </SmallTitle>
                        <h2>{post.title}</h2>
                        <p>{caption}</p>
                        <Button link={`/${post._type}/${post.slug.current}`}>
                            View recipe
                        </Button>
                    </CaptionInner>
                </CaptionContainer>
            </GridContainer>
        </StyledSection>
    )
}

MainPost.propTypes = {
    post: PropTypes.object.isRequired
}

/* Styles */
const StyledSection = styled.section`
    padding: 4rem 0 5rem;
`

const ImageContainer = styled.div`
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
    }
`

const CaptionInner = styled.div`
    width: 60%;

    & > * {
        margin-bottom: 20px;
    }
`
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GridContainer } from '../layout'
import { Link } from 'gatsby'

export const MainPost = ({ post }) => {

    console.log(post)

    return (
        <StyledSection>
            <GridContainer>
                <ImageContainer>
                    <img src={post.featuredImage.asset.fluid.srcWebp} alt={post.title} />
                </ImageContainer>

                <CaptionContainer>
                    <CaptionInner>
                        <span>Featured {post._type}</span>
                        <h1>{post.title}</h1>
                        <Link to={`/${post._type}/${post.slug.current}`}>
                            View recipe
                        </Link>
                    </CaptionInner>
                </CaptionContainer>
            </GridContainer>
        </StyledSection>
    )
}

MainPost.prototypes = {
    postData: PropTypes.object.isRequired
}

/* Styles */
const StyledSection = styled.section`
            padding: 4rem 0 5rem;
        `

const ImageContainer = styled.div`
            position: relative;
            height: 600px;
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
        `

const CaptionInner = styled.div`
            width: 67%;
        
    span {
        display: block;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 20px;  
    }
`
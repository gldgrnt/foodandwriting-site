import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { SmallCaps, InternalLink } from '../ui'
import { GridContainer } from '../layout'
import { VerticalPost } from './components'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const PostSlider = ({ title, posts }) => {
    // Slider settings
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        draggable: true,
        swipe: true,
        swipeToSlide: false,
    }

    // Set up movement methods
    let SliderRef = useRef(null)

    const nextSlide = () => {
        SliderRef.slickNext()
    }

    const prevSlide = () => {
        SliderRef.slickPrev()
    }


    return (
        <StyledSection>
            <StyledGridContainer>
                <UpperWrapper>
                    <TitleWrapper>
                        <SmallCaps as="h2" size="increased" color="black">{title}</SmallCaps>

                        <InternalLink to="/recipes" secondary>View all</InternalLink>
                    </TitleWrapper>

                    <ButtonWrapper>
                        <StyledButton onClick={prevSlide}>
                            <FiArrowLeft />
                        </StyledButton>

                        <StyledButton onClick={nextSlide}>
                            <FiArrowRight />
                        </StyledButton>
                    </ButtonWrapper>
                </UpperWrapper>

                <StyledSlider ref={r => SliderRef = r} {...settings}>
                    {posts.map((post, index) => <VerticalPost key={index} post={post} />)}
                </StyledSlider>
            </StyledGridContainer>
        </StyledSection>
    )
}

PostSlider.prototypes = {
    posts: PropTypes.array.isRequired,
    titile: PropTypes.string.isRequired,
}

const StyledSection = styled.section`
    overflow: hidden;
`

const UpperWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 0 0 30px;
    
    > * {
        margin-bottom: 0;
    }
    `

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    
    > * {
        margin: 0;

        &:first-child {
            margin-right: 30px;
        }   
    }
`

const ButtonWrapper = styled.div`
    > *:first-child {
        margin-right: 10px;
    }
`

const StyledButton = styled.button`
    border: none;
    background: none;
    padding: 5px;

    > svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
        color: ${props => props.disabled ? props.theme.color.lightGrey : props.theme.color.black};
    }
`

const StyledGridContainer = styled(GridContainer)`
    display: block;
`

const StyledSlider = styled(Slider)`
    .slick-list {
        overflow: visible;
    }
`
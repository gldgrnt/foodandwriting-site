import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { SmallCaps, InternalLink } from '../ui'
import { GridContainer } from '../layout'
import { VerticalSliderPost } from './components'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { responsiveBreakpointDown } from '../../utils'

export const PostSlider = ({ title, posts }) => {
    // Set up slider state
    const [activeSlide, setActiveSlide] = useState(0)
    const slideCount = posts.length

    // Slider settings
    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        swipe: true,
        swipeToSlide: true,
        vairableWidth: true,
        touchThreshold: 100,
        afterChange: current => setActiveSlide(current),
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    touchThreshold: 5
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    touchThreshold: 4
                }
            },
        ]
    }

    // Set up movement methods
    let sliderRef = useRef(null)

    const nextSlide = () => {
        sliderRef.slickNext()
    }

    const prevSlide = () => {
        sliderRef.slickPrev()
    }

    return (
        <StyledWrapper>
            <StyledGridContainer>
                <UpperWrapper>
                    <TitleWrapper>
                        <SmallCaps as="h2" size="regular" color="black">{title}</SmallCaps>

                        <InternalLink to="/recipes" secondary>View all</InternalLink>
                    </TitleWrapper>

                    <ButtonWrapper>
                        <StyledButton onClick={prevSlide} disabled={activeSlide === 0}>
                            <FiArrowLeft />
                        </StyledButton>

                        <StyledButton onClick={nextSlide} disabled={activeSlide + 2 === slideCount - 1}>
                            <FiArrowRight />
                        </StyledButton>
                    </ButtonWrapper>
                </UpperWrapper>

                <StyledSlider ref={r => sliderRef = r} {...settings}>
                    {posts.map((post, index) => <VerticalSliderPost key={index} post={post.node} />)}
                </StyledSlider>
            </StyledGridContainer>
        </StyledWrapper>
    )
}

PostSlider.prototypes = {
    posts: PropTypes.array.isRequired,
    titile: PropTypes.string.isRequired,
}

const StyledWrapper = styled.div`
    overflow: hidden;
`

const UpperWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 40px;
    
    > * {
        margin-bottom: 0;
    }
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;

    ${responsiveBreakpointDown('tablet', `
        width: 100%;
        justify-content: space-between;
    `)}
    
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
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

    ${props => responsiveBreakpointDown('tablet', `
        display: none;
    `)}

    > svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
        transition: ${props => props.theme.transition.fast};
        color: ${props => props.disabled ? props.theme.color.lightGrey : props.theme.color.black};
    }
`

const StyledGridContainer = styled(GridContainer)`
    display: block;
`

const StyledSlider = styled(Slider)`
    margin-right: 80px;

    ${responsiveBreakpointDown('desktop', `margin-right: -80px;`)}
    ${responsiveBreakpointDown('tablet', `margin-right: 0;`)}
    ${responsiveBreakpointDown('mobile', `margin: 0 15px;`)}

    .slick-list {
        overflow: visible;
    }
`
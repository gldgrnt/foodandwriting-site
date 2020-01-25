import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { SmallCaps } from '../ui'
import { GridContainer } from '../layout'
import { VerticalPost } from './components'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const PostSlider = ({ title, posts }) => {
    const [state, setState] = useState({ start: true, end: false })

    // Slider settings
    const postsAmount = posts.length
    const toShow = 3

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: toShow,
        slidesToScroll: 1,
        variableWidth: true,
        swipeToSlide: true,
        afterChange: current => {
            const lastItem = current + toShow

            if (current === 0) {
                setState({ start: true, end: false })
            }
            // Rerender only when the slider is at its edges
            else if ((current > 0 && lastItem < postsAmount) && !(state.start === state.end)) {
                setState({ start: false, end: false })
            }
            else if (lastItem === postsAmount) {
                setState({ start: false, end: true })
            }
        }
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
            <GridContainer justify="space-between">
                <TitleWrapper>
                    <SmallCaps tag="h2" size="increased" color="black">{title}</SmallCaps>

                    <ButtonWrapper>
                        <StyledButton disabled={state.start} onClick={prevSlide}>
                            <FiArrowLeft />
                        </StyledButton>

                        <StyledButton disabled={state.end} onClick={nextSlide}>
                            <FiArrowRight />
                        </StyledButton>
                    </ButtonWrapper>
                </TitleWrapper>
            </GridContainer>

            <StyledGridContainer>
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

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
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

    .slick-slide:not(:last-child) img {
        margin-right: 80px;
    }
`
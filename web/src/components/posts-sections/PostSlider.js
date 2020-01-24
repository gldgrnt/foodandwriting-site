import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SmallCaps } from '../ui'
import { GridContainer, GridRow, GridCol } from '../layout'
import { VerticalPost } from './components'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const PostSlider = ({ title, posts }) => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
    }

    return (
        <StyledSection>
            <GridContainer justify="space-between">
                <SmallCaps tag="h2" size="regular" color="black">{title}</SmallCaps>
            </GridContainer>

            <StyledGridContainer>
                <StyledSlider {...settings}>
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
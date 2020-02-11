import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { SmallCaps } from '../ui'
import { FiArrowDown } from 'react-icons/fi'

export const PostHero = ({ imageSrcSet, category, title }) => {

    let heroRef = useRef(null);

    const handleScrollDownClick = (event) => {
        event.preventDefault();

        window.scrollTo({
            top: heroRef.clientHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <HeroWrapper ref={r => heroRef = r}>
            <ImageWrapper>
                <Image srcSet={imageSrcSet} />
            </ImageWrapper>

            <CaptionWrapper>
                <SmallCaps size="regular" color="mediumGrey">{category}</SmallCaps>
                <Title>{title}</Title>

                <ScrollDown onClick={handleScrollDownClick}>
                    <span>Scroll down</span>
                    <FiArrowDown />
                </ScrollDown>
            </CaptionWrapper>
        </HeroWrapper>
    )
}

PostHero.propTypes = {
    // image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

const HeroWrapper = styled.div`
    height: 85vh;
    min-height: 500px;
    display: flex;

    & > * {
        flex-basis: 50%;
    }
`

const ImageWrapper = styled.div`
    position: relative;
`

const Image = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
`

const CaptionWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.color.whiteGrey};
    text-align: center;
`

const Title = styled.h1`
    max-width: 450px;
    margin: 10px 0 60px;
`

const ScrollDown = styled.button`
    position: absolute;
    bottom: 40px;
    display: flex;
    background: none;
    border: none;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.color.darkGrey};
    transition: color ${props => props.theme.transition.fast};

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }

    span {
        display: inline-block;
        font-family: ${props => props.theme.font.family.sans};
        font-weight: bold;
        font-size: ${props => props.theme.font.size.tiny};
        text-transform: uppercase;
    }
`
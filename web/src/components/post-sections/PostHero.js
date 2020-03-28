import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { SmallCaps } from '../ui'
import { FiArrowDown } from 'react-icons/fi'
import { responsiveBreakpointDown } from '../../utils'

export const PostHero = ({ featuredImage, subtitle, title }) => {

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
                { !!featuredImage ? <Img fluid={featuredImage.asset.fluid} /> : <div></div>}
            </ImageWrapper>

            <CaptionWrapper>
                <SmallCaps size="regular" color="mediumGrey">{subtitle}</SmallCaps>
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
    featuredImage: PropTypes.object.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

const HeroWrapper = styled.div`
    position: relative;
    height: 85vh;
    min-height: 500px;
    display: flex;
    overflow: hidden;

    ${responsiveBreakpointDown('mobile', `
        height: calc(90vh - 65px);
    `)}

    & > * {
        flex-basis: 50%;
    }
`

const ImageWrapper = styled.div`
    position: relative;
    background: ${props => props.theme.color.lightGreyOverlay};

    ${responsiveBreakpointDown('tablet', `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        flex-basis: auto;
    `)}

    ${props => responsiveBreakpointDown('mobile', `
        width: calc(100% - ${props.theme.grid.spacing * 2}px);
        left: 0;
        width: 100%;
    `)}

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
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

    ${props => responsiveBreakpointDown('tablet', `
        position: relative;
        z-index: 2;
        flex-basis: 100%;
        padding: 60px;
        text-align: center;
        background: ${props.theme.color.blackOverlay};
        color: white;

        > * {
            color: inherit !important;
        }
    `)}

    ${responsiveBreakpointDown('mobile', `
        padding: 60px 30px;
    `)}
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
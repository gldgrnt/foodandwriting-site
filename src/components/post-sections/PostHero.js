import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { SmallCaps, ScrollDown, Image } from '../ui'
import { responsiveBreakpointDown } from '../../utils'

export const PostHero = ({ featuredImage, subtitle, title }) => {


    // Create tag to scroll to
    const scrollId = 'hero'

    return (
        <HeroWrapper id={scrollId}>
            <ImageWrapper>
                <Image fadeScaleIn source={featuredImage} fallbackSize={{ width: 960, height: 500 }} sizes={[
                    { width: 960, height: 800, mediaMin: 1600 },
                    { width: 800, height: 510, mediaMin: 1200 },
                    { width: 600, height: 380, mediaMin: 1000 },
                    { width: 768, height: 900, mediaMin: 768 },
                    { width: 420, height: 530, mediaMin: 0 }
                ]} />
            </ImageWrapper>

            <CaptionWrapper>
                <SmallCaps size="regular" color="mediumGrey">{subtitle}</SmallCaps>
                <Title>{title}</Title>

                <ScrollDown tagId={scrollId} />
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
        height: calc(80vh - 65px);
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
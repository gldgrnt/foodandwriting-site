import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PageContext } from '../context'
import { urlFor } from '../../utils'

/**
 * Get the type of animation passed via props
 * 
 * @param {Object} props 
 * @returns {String} returns a string from the related animation prop
 */
const getAnimationType = (props) => {
    switch (true) {
        case props.fadeScaleIn: return 'fadeScaleIn'
        case props.fadeIn: return 'fadeIn'
        default: return
    }
}

/**
 * Get the fallback size from the largest sized minimum media size
 * 
 * @param {Array} sizes Array of image sizes
 * @returns {Object} Object containing the dimensions of the largest minimum media size
 */
const getFallbackSize = (sizes) => {
    const maxMedia = Math.max.apply(null, sizes.map(size => size.mediaMin))
    const [fallbackSize] = sizes.filter(size => size.mediaMin === maxMedia)

    return fallbackSize
}

/**
 * Image component
 */
export const Image = ({ source, sizes, dpr = [1.5, 2], ...props }) => {
    // Variables
    const maxDpr = dpr.reduce((a, b) => Math.max(a, b))
    const urlWithSize = useCallback(({ width, height }) => urlFor(source).size(width, height), [source])
    const altText = source?.alt || ''

    return (
        <PageContext.Consumer>
            {({ browser }) => {
                if (browser === null || browser.name === 'node') return <StyledImg src="" className="hidden" alt={altText} /> // Prerender empty image with alt

                if (!['safari', 'ios'].includes(browser.name)) {
                    return (
                        <picture>
                            {sizes.map(size => (
                                <source
                                    key={size.mediaMin} media={`(min-width: ${size.mediaMin}px)`}
                                    srcSet={`${urlWithSize(size).auto('format').url()}, ${dpr.map(dprValue => `${urlWithSize(size).dpr(dpr).auto('format').url()} ${dprValue}x`).toString()}`} />
                            ))}

                            <StyledImg src={urlWithSize(getFallbackSize(sizes)).format('jpg').dpr(1).url()} className={getAnimationType(props)} alt={altText} loading="lazy" onLoad={(e) => { e.target.className += ' loaded'; e.target.onload = null }} />
                        </picture>
                    )
                } else {
                    return <StyledImg src={urlWithSize(getFallbackSize(sizes)).format('jpg').dpr(maxDpr).url()} className={getAnimationType(props)} alt={altText} loading="lazy" onLoad={(e) => { e.target.className += ' loaded'; e.target.onload = null }} />
                }
            }}
        </PageContext.Consumer>
    )
}

/**
 * PropTypes
 */
Image.propTypes = {
    source: PropTypes.object.isRequired,
    sizes: PropTypes.arrayOf(
        PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            mediaMin: PropTypes.number.isRequired
        }).isRequired,
    )
}

/**
 * Styles
 */
const StyledImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 1s ease, opacity 1.4s ease;

    &.hidden {
        opacity: 0;
    }

    &.fadeScaleIn {
    opacity: 0;
    transform: scale(1.1);
        
        &.loaded {
            opacity: 1;
            transform: scale(1);
        }
    }

    &.fadeIn {
        opacity: 0;

        &.loaded {
            opacity: 1;
        }
    }
`
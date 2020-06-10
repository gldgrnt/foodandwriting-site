import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
        default: return console.error('Set image load animation')
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
    const dprValues = dpr
    const urlWithSize = useCallback(({ width, height }) => urlFor(source).size(width, height), [source])

    // Set up image fade in using onload property and css
    let imgRef = useRef(null)
    useEffect(() => {
        imgRef.current.onload = (e) => {
            e.target.className += ' loaded'
            e.target.onload = null // Remove the listener after first invocation
        }
        imgRef.current.src = urlWithSize(getFallbackSize(sizes)).format('jpg').dpr(1).url()
    }, [sizes, urlWithSize])

    return (
        <picture>
            {sizes.map(size => (
                <source
                    key={size.mediaMin} media={`(min-width: ${size.mediaMin}px)`}
                    srcSet={`${urlWithSize(size).auto('format').url()}, ${dprValues.map(dpr => `${urlWithSize(size).dpr(dpr).auto('format').url()} ${dpr}x`).toString()}`} />
            ))}

            <StyledImg ref={imgRef} className={getAnimationType(props)} alt={'h'} loading="lazy" />
        </picture>
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
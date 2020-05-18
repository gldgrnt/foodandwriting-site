import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { urlFor } from '../../utils'

/**
 * Image component
 */
export const Image = ({ source, fallbackSize, sizes }) => {
    let imgRef = useRef(null)

    // Variables
    const dprValues = [1.5, 2]
    const urlWithSize = ({ width, height }) => urlFor(source).size(width, height)

    useEffect(() => {
        imgRef.current.onload = (e) => e.target.className += ' loaded'
        imgRef.current.src = urlWithSize(fallbackSize).format('jpg').dpr(1).url()
    }, [fallbackSize, urlWithSize])

    return (
        <picture>
            {sizes.map(size => (
                <source
                    key={size.mediaMin} media={`(min-width: ${size.mediaMin}px)`}
                    srcSet={`${urlWithSize(size).auto('format').url()}, ${dprValues.map(dpr => `${urlWithSize(size).dpr(dpr).auto('format').url()} ${dpr}x`).toString()}`} />
            ))}

            <StyledImg ref={imgRef} alt={source.alt || ''} loading="lazy" />
        </picture>
    )
}

/**
 * PropTypes
 */
Image.propTypes = {
    source: PropTypes.object.isRequired,
    fallbackSize: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    sizes: PropTypes.arrayOf(
        PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            mediaMin: PropTypes.number.isRequired
        }).isRequired,
    )
}

/**
 * Sytles
 */
const StyledImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.1);
    transition: opacity 1s ease, transform 1s ease;

    &.loaded {
        opacity: 1;
        transform: scale(1);
    }
`
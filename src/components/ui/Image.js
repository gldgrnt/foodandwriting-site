import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { urlFor } from '../../utils'

/**
 * Image component
 */
export const Image = ({ source, fallbackSize, sizes }) => {
    // Initialise loading state
    const [loaded, setLoaded] = useState(false)

    // Variables
    const dprValues = [1.5, 2]
    const urlWithSize = ({ width, height }) => urlFor(source).size(width, height)

    return (
        <picture>
            {sizes.map(size => (
                <source
                    key={size.mediaMin} media={`(min-width: ${size.mediaMin}px)`}
                    srcSet={`${urlWithSize(size).auto('format').url()}, ${dprValues.map(dpr => `${urlWithSize(size).dpr(dpr).auto('format').url()} ${dpr}x`).toString()}`} />
            ))}

            <StyledImg onLoad={() => setLoaded(true)} src={urlWithSize(fallbackSize).format('jpg').dpr(1).url()} alt={source.alt || ''} loading="lazy" loaded={loaded} />
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
    opacity: ${props => props.loaded ? 1 : 0};
    transform: ${props => props.loaded ? 'scale(1)' : 'scale(1.1)'};
    transition: opacity 1s ease, transform 1s ease;
    object-fit: cover;
`
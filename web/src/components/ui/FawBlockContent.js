import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import Proptypes from 'prop-types'

/**
 * BlockContent component
 */
export const FawBlockContent = ({ content }) => {

    // Serializers
    const serializers = {
        types: {
            flexImages: props => {
                const {caption, images} = props.node
                
                return (
                    <FlexImagesWrapper>
                        <ImagesWrapper count={images.length} spacing={30}>
                            {images.map(image => (
                                <img key={image._key} src={image.asset.url} alt={image.alt} loading="lazy" />
                            ))} 
                        </ImagesWrapper>
                        <FlexImagesCaption>{caption}</FlexImagesCaption>
                    </FlexImagesWrapper>
                )
            }
        }
    }

    return (
        <BlockContent blocks={content} serializers={serializers} />
    )
}

/**
 * PropTypes
 */
FawBlockContent.propTypes = {
    content: Proptypes.array.isRequired
}

/**
 * Styles
 */
const FlexImagesWrapper = styled.div`
    max-width: none !important;
    padding: 50px 0 40px;
`

const ImagesWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    img  {
        object-fit: cover;
        max-width: ${props => `calc((100% / ${props.count}) - ((${props.spacing}px * ${props.count}) - ${props.spacing}px ))`};
    }
`

const FlexImagesCaption = styled.p`
    font-style: italic;
    font-size: ${props => props.theme.font.size.regular};
    color: ${props => props.theme.color.darkGrey};
`
import React from 'react'
import propTypes from 'prop-types'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

//Validate props
FlexImages.propTypes = {
    value: propTypes.object
}

export default function FlexImages(props) {
    const { images, caption } = props.value

    //Set up 
    const builder = imageUrlBuilder(sanityClient({
        projectId: "s1s9nwnc",
        dataset: "development",
        useCdn: true
    }));

    //Computed values
    const imagesNumber = images && images.length;
    const imageWidthUrl = images && Math.floor(700 / imagesNumber);

    //Styles
    const rowStyles = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }

    const imageStyles = {
        objectFit: 'cover',
        width: `calc(${100 / imagesNumber}% - ${1 - (1 / imagesNumber)}rem)`,
    }

    const pStyles = {
        fontSize: '0.8rem',
        fontStyle: 'italic',
        padding: '1rem',
        margin: '0',
        color: 'grey'
    }

    return (
        <>
            <div style={rowStyles}>
                {images && images.map((image) =>
                    image.asset &&
                    <img key={image._key} src={builder.image(image).width(imageWidthUrl)} style={imageStyles} />
                )}
            </div>
            {caption && <p style={pStyles}>{caption}</p>}
        </>
    )
}
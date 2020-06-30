import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image/withIEPolyfill"
import styled from "styled-components"

import { getFluidPropsFromId, responsiveBreakpointDown } from "../../../utils"

/**
 * FlexImagesType component
 */
export const FlexImagesType = ({ node: { caption, images } }) => {
    return (
        <FlexImagesWrapper>
            <ImagesWrapper count={images.length} spacing={30}>
                {images.map(image => (
                    <Img
                        key={image._key}
                        fluid={getFluidPropsFromId(image.asset.id)}
                        alt={image.alt}
                        loading="lazy"
                    />
                ))}
            </ImagesWrapper>
            <FlexImagesCaption count={images.length}>
                {caption}
            </FlexImagesCaption>
        </FlexImagesWrapper>
    )
}

/**
 * PropTypes
 */
FlexImagesType.propTypes = {
    node: PropTypes.shape({
        caption: PropTypes.string,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                _key: PropTypes.string.isRequired,
                asset: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                }),
                alt: PropTypes.string,
            })
        ),
    }).isRequired,
}

/**
 * Styles
 */
const FlexImagesWrapper = styled.div`
    max-width: none !important;
    padding: 70px 0 60px;
    width: 100%;

    ${responsiveBreakpointDown(
        "mobile",
        `
        padding: 40px 0 30px;
    `
    )}
`

const ImagesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    ${responsiveBreakpointDown(
        "mobile",
        `
        flex-wrap: wrap;
    `
    )}

    > * {
        width: 100%;
        margin: ${props => (props.count === 1 ? "auto" : "")};
        max-width: ${props =>
            props.count === 1
                ? "100%"
                : `calc((100% / ${props.count}) - ((${props.spacing}px * ${props.count}) - ${props.spacing}px ))`};

        ${responsiveBreakpointDown(
            "mobile",
            `
            max-width: none;

            &:nth-child(2) {
                margin-top: 30px;
            }
        `
        )}
    }

    img {
        object-fit: cover;
    }
`

const FlexImagesCaption = styled.p`
    font-style: italic;
    font-size: ${props => props.theme.font.size.regular};
    color: ${props => props.theme.color.darkGrey};
`

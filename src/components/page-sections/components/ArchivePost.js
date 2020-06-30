import React, { useCallback } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import { responsiveBreakpointDown, parseReadyInString } from "../../../utils"
import { SmallCaps, PostMeta, Image } from "../../ui"

/**
 * Archive post component
 */
export const ArchivePost = ({
    post: {
        title,
        date,
        fullSlug,
        _rawFeaturedImage,
        category: { singleName },
        content,
    },
    isRecipe,
}) => {
    // Set up variables
    const imageRatio = isRecipe ? 120 : 67
    const calculateHeight = useCallback(
        width => Number(Math.floor(width * (imageRatio / 100)).toFixed(0)),
        [imageRatio]
    )
    const imageSizes = [
        { width: 470, height: calculateHeight(470), mediaMin: 1600 },
        { width: 350, height: calculateHeight(350), mediaMin: 1200 },
        { width: 440, height: calculateHeight(440), mediaMin: 1000 },
        { width: 345, height: calculateHeight(345), mediaMin: 768 },
        { width: 500, height: calculateHeight(500), mediaMin: 0 },
    ]
    let recipeMeta = []

    if (isRecipe) {
        const { serves, readyIn } = content[0]
        recipeMeta = [`Serves ${serves}`, parseReadyInString(readyIn)]
    }

    return (
        <StyledLink to={fullSlug}>
            <article>
                <ImageWrapper imageRatio={imageRatio}>
                    {_rawFeaturedImage ? (
                        <Image
                            fadeIn
                            source={_rawFeaturedImage}
                            sizes={imageSizes}
                        />
                    ) : (
                        <div></div>
                    )}
                </ImageWrapper>

                {isRecipe ? (
                    <PostMeta meta={recipeMeta} />
                ) : (
                    <PostMeta date={date} />
                )}

                <Title>{title}</Title>
                <SmallCaps size="tiny" link>
                    View {singleName}
                </SmallCaps>
            </article>
        </StyledLink>
    )
}

/**
 * Proptypes
 */
ArchivePost.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
            asset: PropTypes.object,
        }),
    }),
}

/**
 * Styles
 */
const StyledLink = styled(Link)`
    width: calc((100% / 3) - (160px / 3));
    text-decoration: none;
    outline: none;

    ${responsiveBreakpointDown(
        "desktop",
        `width: calc((100% / 3) - (120px / 3));`
    )}
    ${responsiveBreakpointDown(
        "laptop",
        `width: calc((100% / 2) - (80px / 2));`
    )}
    ${responsiveBreakpointDown(
        "tablet",
        `width: calc((100% / 2) - (40px / 2));`
    )}
    ${responsiveBreakpointDown("mobile", `width: 100%;`)}

    &:hover,
    &:focus {

        article {
            h2 {
                text-decoration: underline;
            }
            
            > span {
                color: ${props => props.theme.color.black};

                &::after {
                    background: ${props => props.theme.color.black};
                }
            }

            img {
                transform: scale(1.03);
            }
        }
    }

    ${responsiveBreakpointDown(
        "tablet",
        `
        article > span {
            display: none;
        }
    `
    )}
`

const ImageWrapper = styled.div`
    position: relative;
    background: ${props => props.theme.color.lightGreyOverlay};
    padding-top: ${props => props.imageRatio}%;
    margin-bottom: 20px;
    overflow: hidden;

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const Title = styled.h2`
    font-size: ${props => props.theme.font.size.medium};
    margin-bottom: 10px;
    padding-top: 5px;
    padding-right: 30px;
`

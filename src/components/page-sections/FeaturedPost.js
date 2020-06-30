import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { GridContainer } from "../layout"
import { InternalLink, SmallCaps, PostMeta, Image } from "../ui"
import { responsiveBreakpointDown, parseReadyInString } from "../../utils"

/**
 * FeaturedPost component
 */
export const FeaturedPost = ({
    post: {
        title,
        _rawFeaturedImage,
        fullSlug,
        category: { singleName, categoryType },
        content,
        date,
    },
    description,
}) => {
    // Set up post meta
    const isRecipe = categoryType === "Recipe"

    const { serves, readyIn } = content[0]
    const humanReadyIn = parseReadyInString(readyIn)

    return (
        <GridContainer removeMobilePadding={true}>
            <Article>
                <InternalLink to={fullSlug}>
                    <ImageWrapper>
                        <Image
                            fadeScaleIn
                            source={_rawFeaturedImage}
                            fallbackSize={{ width: 780, height: 700 }}
                            sizes={[
                                { width: 780, height: 700, mediaMin: 1600 },
                                { width: 580, height: 540, mediaMin: 1200 },
                                { width: 480, height: 540, mediaMin: 1000 },
                                { width: 728, height: 500, mediaMin: 768 },
                            ]}
                        />
                    </ImageWrapper>

                    <CaptionContainer>
                        <CaptionInner>
                            {isRecipe ? (
                                <PostMeta
                                    meta={[
                                        `Featured ${singleName}`,
                                        `Serves ${serves}`,
                                        humanReadyIn,
                                    ]}
                                />
                            ) : (
                                <PostMeta
                                    date={date}
                                    meta={[`Featured ${singleName}`]}
                                />
                            )}
                            <Title>{title}</Title>
                            <Description>{description}</Description>
                            <SmallCaps size="tiny" link>
                                View {singleName}
                            </SmallCaps>
                        </CaptionInner>
                    </CaptionContainer>
                </InternalLink>
            </Article>
        </GridContainer>
    )
}

/**
 * Proptypes
 */
FeaturedPost.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        category: PropTypes.shape({
            singleName: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired,
            }),
        }),
        featuredImage: PropTypes.object.isRequired,
        recipeIntro: PropTypes.string,
    }),
}

/**
 * Styles
 */
const Article = styled.article`
    width: 100%;

    > * {
        display: flex;
        background: ${props => props.theme.color.whiteGrey};
        min-height: 700px;

        ${responsiveBreakpointDown(
            "desktop",
            `
            min-height: 540px;
        `
        )}

        ${responsiveBreakpointDown(
            "tablet",
            `
            min-height: 500px;
            background: transparent;
        `
        )}

        ${responsiveBreakpointDown(
            "mobile",
            `
            min-height: calc(90vh - 65px);
        `
        )}

        &:hover {
            h2 {
                text-decoration: underline;
            }
            
            p + span:last-child {
                color: ${props => props.theme.color.black};
            }

            img {
                transform: scale(1.05) !important;
            }
        }
    }
`

const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    flex-basis: 50%;

    ${responsiveBreakpointDown(
        "tablet",
        `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        flex-basis: auto;
    `
    )}

    ${responsiveBreakpointDown(
        "mobile",
        `
        left: 0;
        width: 100%;
    `
    )}
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
    padding: 210px 0;

    ${responsiveBreakpointDown(
        "desktop",
        `
        padding: 140px 0;
    `
    )}

    ${props =>
        responsiveBreakpointDown(
            "tablet",
            `
        position: relative;
        z-index: 2;
        flex-basis: 100%;
        padding: 60px;
        text-align: center;
        background: ${props.theme.color.blackOverlay};
    `
        )}

    ${responsiveBreakpointDown(
        "mobile",
        `
        padding: 60px 30px;
    `
    )}
`

const CaptionInner = styled.div`
    width: 55%;

    & > * {
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }

    ${responsiveBreakpointDown("desktop", `width: 65%;`)}
    ${responsiveBreakpointDown(
        "tablet",
        `
        display: flex;
        flex-direction: column;
        align-items: center;
        width: auto;
        
        * {
            color: white !important;

            &::after {
                background: white;
            }
        }
    `
    )}

    ${props =>
        responsiveBreakpointDown(
            "mobile",
            `
        > p:first-child {
            font-size: ${props.theme.font.size.regular};
        }
    `
        )}
`

const Title = styled.h2`
    font-size: ${props => props.theme.font.size.giant};

    ${props =>
        responsiveBreakpointDown(
            "desktop",
            `font-size: ${props.theme.font.size.huge};`
        )}
    ${props =>
        responsiveBreakpointDown(
            "tablet",
            `font-size: ${props.theme.font.size.giant};`
        )}
`

const Description = styled.p`
    font-family: ${props => props.theme.font.family.serif};
    color: ${props => props.theme.color.black};
    font-size: ${props => props.theme.font.size.regular};
    font-weight: 400;

    ${responsiveBreakpointDown("desktop", `font-size: 0.9rem;`)}
    ${responsiveBreakpointDown("tablet", `display: none;`)}
`

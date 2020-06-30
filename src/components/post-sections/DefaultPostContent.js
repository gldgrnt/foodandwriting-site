import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { FawBlockContent } from "../block-content"
import { GridContainer } from "../layout"
import { getPostDate } from "../../utils"
import { SignOff } from "./SignOff"

/**
 * DefaultPostContent component
 */
export const DefaultPostContent = ({
    content,
    date,
    maxTextWidth = "none",
}) => {
    const postDate = getPostDate(date, "Do MMMM YYYY")

    return (
        <GridContainer>
            <ContentWrapper maxTextWidth={maxTextWidth}>
                <Date
                    maxTextWidth={maxTextWidth}
                    aria-label={`Posted on ${postDate.formatted}`}
                >
                    <time dateTime={postDate.raw}>{postDate.formatted}</time>
                </Date>
                <FawBlockContent content={content} />
                <SignOff maxWidth={maxTextWidth} />
            </ContentWrapper>
        </GridContainer>
    )
}

/**
 * PropTypes
 */
DefaultPostContent.propTypes = {
    date: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    maxTextWidth: PropTypes.string,
}

/**
 * Styles
 */
const ContentWrapper = styled.article`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    font-size: ${props => props.theme.font.size.increased};

    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > p {
            width: 100%;
            max-width: ${props => props.maxTextWidth};

            &:first-child::first-letter {
                font-size: 620%;
                float: left;
                line-height: 0.9;
                margin-right: 0.2em;
                margin-top: -2px;
            }
        }
    }
`

const Date = styled.time`
    display: block;
    max-width: ${props => props.maxTextWidth};
    margin: 0 auto 60px;

    > * {
        display: block;

        &:first-child {
            margin-bottom: 10px;
        }
    }

    time {
        font-weight: bold;
    }
`

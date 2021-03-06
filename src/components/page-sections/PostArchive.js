import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { GridContainer } from "../layout"
import { ArchivePost } from "./components"
import { responsiveBreakpointDown } from "../../utils"

/**
 * PostArchive component
 */
export const PostArchive = ({ posts, categoryType = "" }) => {
    const isRecipe = categoryType === "Recipe"

    return (
        <GridContainer>
            <PostsWrapper>
                {posts.map(post => (
                    <ArchivePost
                        key={post._id}
                        post={post}
                        isRecipe={isRecipe}
                    />
                ))}
            </PostsWrapper>
        </GridContainer>
    )
}

/**
 * PropTypes
 */
PostArchive.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    categoryType: PropTypes.string,
}

/**
 * Styles
 */

const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: -80px;

    ${responsiveBreakpointDown("laptop", `justify-content: space-between;`)}
    ${responsiveBreakpointDown("mobile", `margin-bottom: -60px;`)}

    > * {
        margin-bottom: 80px;

        ${responsiveBreakpointDown("mobile", `margin-bottom: 60px;`)}

        &:not(:nth-child(3n)) {
            margin-right: 80px;

            ${responsiveBreakpointDown("desktop", `margin-right: 60px;`)}
            ${responsiveBreakpointDown("laptop", `margin-right: 0;`)}
        }

        &:last-child {
            margin-right: 0 !important;
        }
    }
`

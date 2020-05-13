import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer, Section } from '../layout'
import { SmallCaps, InternalLink } from '../ui'
import { PostArchive } from '../page-sections'

/**
 * RelatedPosts 
 */
export const RelatedPosts = ({ category: { slug, viewAllName }, autoPosts, selectedPosts }) => {

    const relatedPostsArray = mergeRelatedPosts(autoPosts, selectedPosts)

    return (
        <>
            <GridContainer justify="center">
                <TitleWrapper>
                    <SmallCaps size="small" as="h2">Read more</SmallCaps>
                    <Title>Related posts</Title>
                </TitleWrapper>
            </GridContainer>

            <PostArchive posts={relatedPostsArray} />

            <GridContainer justify="center">
                <Section as="div" spacingTop="2">
                    <InternalLink to={`/${slug.current}`} secondary>View all {viewAllName}</InternalLink>
                </Section>
            </GridContainer>
        </>
    )
}

/**
 * Compare and reduce auto and selected posts to 3 post array
 * 
 * @param {[]} autoPosts Automatically selected posts from same category
 * @param {[]} selectedPosts Posts selected from sanity
 * @returns {[]} Array of 3 selected posts
 */
const mergeRelatedPosts = (autoPosts, selectedPosts) => {
    // Create a single array to operate on, starting with the selected posts
    let postsArray = []

    if (selectedPosts.length) postsArray = [...selectedPosts]
    if (autoPosts.length) postsArray = [...postsArray, ...autoPosts]

    // Filter out repeated items
    const filteredPostsArray = postsArray.filter((post, index) => postsArray.findIndex(item => item._id === post._id) === index)

    return filteredPostsArray.slice(0, 3)
}



/**
 * PropTypes
 */
RelatedPosts.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.shape({
            current: PropTypes.string.isRequired
        }).isRequired,
        viewAllName: PropTypes.string.isRequired,
    }).isRequired,
    autoPosts: PropTypes.array.isRequired,
    selectedPosts: PropTypes.array.isRequired,
}


/**
 * Styles
 */
const TitleWrapper = styled.div`
    text-align: center;
    margin-bottom: 30px;
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.giant};
`
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { HorizontalPost } from './components'
import { SmallCaps, InternalLink } from '../ui'

export const PostList = ({ category, posts }) => {

    const { title, slug, viewAllName } = category

    return (
        <>
            <SmallCaps as="h2" size="regular" color="black">{title}</SmallCaps>

            <PostWrapper>
                { posts && posts.map(({ node }) => (
                   <HorizontalPost key={node._id} post={node}></HorizontalPost> 
                ))}
            </PostWrapper>

            <InternalLink to={`/${slug.current}`} secondary>View all {viewAllName}</InternalLink>
        </>
    )
}

PostList.prototypes = {
    category: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.shape({
            current: PropTypes.string.isRequired
        }),
        categoryObject: PropTypes.shape({
            viewAllName: PropTypes.string.isRequired,
        })
    }).isRequired,
    posts: PropTypes.array.isRequired
}

const PostWrapper = styled.div`
    margin-top: 40px;

    > * {
        margin-bottom: 40px;
    }
`
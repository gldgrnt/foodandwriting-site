import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { HorizontalPost } from './components'
import { SmallCaps, InternalLink } from '../ui'

export const PostList = ({ category, posts }) => {


    return (
        <>
            <SmallCaps as="h2" size="regular" color="black">{category.title}</SmallCaps>

            <PostWrapper>
                <HorizontalPost post={posts[0]}></HorizontalPost>
                <HorizontalPost post={posts[0]}></HorizontalPost>
                <HorizontalPost post={posts[0]}></HorizontalPost>
            </PostWrapper>

            <InternalLink to="/culture" secondary>View all {category.title} posts</InternalLink>
        </>
    )
}

PostList.prototypes = {
    category: PropTypes.object,
    posts: PropTypes.array
}

const PostWrapper = styled.div`
    margin-top: 40px;

    > * {
        margin-bottom: 40px;
    }


`
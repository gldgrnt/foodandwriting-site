import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { HorizontalPost } from './components'
import { SmallCaps } from '../ui'

export const PostList = ({ category, posts }) => {


    return (
        <>
            <SmallCaps as="h2" size="increase" color="black">{category.title}</SmallCaps>

            <PostWrapper>
                <HorizontalPost post={posts[0]}></HorizontalPost>
                <HorizontalPost post={posts[0]}></HorizontalPost>
                <HorizontalPost post={posts[0]}></HorizontalPost>
            </PostWrapper>
        </>
    )
}

PostList.prototypes = {
    category: PropTypes.object,
    posts: PropTypes.array
}

const PostWrapper = styled.div`
    > *:not(:last-child) {
        margin-bottom: 40px;
    }
`
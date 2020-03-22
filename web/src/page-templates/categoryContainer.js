import React, { useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'

import Category from './category'
import { PreviewPostFragment, FullCategoryFragment } from '../graphql'

export default ({ data: { category, posts } }) => {
     /**
     * Get more posts
     * 
     */
    const [state, setState] = useState({ posts: posts.edges, loading: false })

    const handleMorePostsClick = () => {
        if (state.loading) return

        setState(oldState => ({ ...oldState, loading: true}))

        const categoryId = category._id
        const amount = 6
        const offset = state.posts.length
        
        // Get posts
        axios.get(`/.netlify/functions/get-posts?categoryId=${categoryId}&amount=${amount}&offset=${offset}`)
            .then(response => (
                setState(oldState => ({ posts: [...oldState.posts, ...response.data.posts], loading: false}))
            ))
            .catch(error => console.log(error))   
    }
    
    return (
        <Category category={category} posts={state.posts} getMorePosts={handleMorePostsClick} />
    )
}

/**
 * Page query
 */
export const query = graphql`
    query ($_id: String) {
        category: sanityCategory(_id: {eq: $_id}) {
            ...FullCategoryFragment
        }
        posts: allSanityPost(filter: {category: {_id: {eq: $_id}}}, limit: 10) {
            totalCount
            edges {
                node {
                   ...PreviewPostFragment
                }
            }
        }
    }
`
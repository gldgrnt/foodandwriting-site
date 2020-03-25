import React, { useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'

import { Category } from './category'

export default ({ data: { category, posts } }) => {
     /**
     * Get more posts
     * 
     */
    const [state, setState] = useState({ postsOnPage: posts.edges, loading: false })
    const AMOUNT = posts.edges.length
    const TOTAL = posts.totalCount

    const handleMorePostsClick = () => {
        if (state.loading) return

        setState(oldState => ({ ...oldState, loading: true}))

        const categoryId = category._id
        const offset = state.postsOnPage.length
        
        // Get posts
        axios.get(`/.netlify/functions/get-posts?categoryId=${categoryId}&amount=${AMOUNT}&offset=${offset}`)
            .then(response => (
                setState(oldState => ({ postsOnPage: [...oldState.postsOnPage, ...response.data.posts], loading: false}))
            ))
            .catch(error => console.log(error))   
    }
    
    return (
        <Category category={category} posts={state.postsOnPage} getMorePosts={handleMorePostsClick} showButton={state.postsOnPage.length < TOTAL} />
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
        posts: allSanityPost(sort: {order: DESC, fields: date}, filter: {category: {_id: {eq: $_id}}}, limit: 6) {
            totalCount
            edges {
                node {
                   ...PreviewPostFragment
                }
            }
        }
    }
`
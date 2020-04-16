import React, { useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'

import { CategoryPage } from './components'

export default ({ data: { category, posts } }) => {
    /**
     * Get initail posts from sessionStorage if the user has already loaded more
     */
    const STORAGE_KEY = `${category.slug.current}-category-posts`
    const loadedPosts = (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) ? JSON.parse(sessionStorage.getItem(STORAGE_KEY)) : posts.nodes

     /**
     * Get more posts
     */
    const [state, setState] = useState({ postsOnPage: loadedPosts, loading: false })
    const AMOUNT = posts.nodes.length
    const TOTAL = posts.totalCount

    const handleMorePostsClick = () => {
        if (state.loading) return

        setState(oldState => ({ ...oldState, loading: true}))

        const categoryId = category._id
        const offset = state.postsOnPage.length
        
        // Get posts
        axios.get(`/.netlify/functions/get-posts?categoryId=${categoryId}&amount=${AMOUNT}&offset=${offset}`)
            .then(response => (
                setState(oldState => {
                    // Create array of current and loaded posts
                    const allPosts = [...oldState.postsOnPage, ...response.data.posts]

                    // Add to session storage
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allPosts))
                    
                    // Return state
                    return { postsOnPage: allPosts, loading: false}})
            ))
            .catch(error => console.log(error))   
    }
    
    return (
        <CategoryPage category={category} posts={state.postsOnPage} getMorePosts={handleMorePostsClick} showButton={state.postsOnPage.length < TOTAL} />
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
            nodes {
                ...PreviewPostFragment
            }
        }
    }
`
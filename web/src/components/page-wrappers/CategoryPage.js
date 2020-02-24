import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'

import { Section, GridContainer, GridRow, GridCol } from '../layout'
import { responsiveBreakpointDown } from '../../utils'
import { ArchivePost } from '../page-sections'
import { Button } from '../ui'

export const CategoryPage = ({ categoryData, postData, postSizePercentage }) => {
    const [state, setState] = useState({ posts: postData.nodes, loading: false})

    // Get more posts logic
    const handleMorePostsClick = () => {
        if (state.loading) return

        setState(oldState => ({ ...oldState, loading: true}))

        const categoryId = categoryData._id
        const amount = 6
        const offset = state.posts.length
        
        // Get posts
        axios.get(`/.netlify/functions/get-posts?categoryId=${categoryId}&amount=${amount}&offset=${offset}`)
            .then(response => (
                setState(oldState => ({ posts: [...oldState.posts, ...response.data.posts], loading: false}))
            ))
            .catch(error => console.log(error))   
    }
    
    // Variables
    const { title, categoryOptions: {viewAllName} } = categoryData
    const showGetPostsButton = state.posts.length < postData.totalCount

    return (
        <>
            <Section spacingTop="2" spacingBottom={{'monitor': 3, 'tablet': 2}}>
                <GridContainer>
                    <GridRow>
                        <GridCol cols="4">
                            <Title>{title}</Title>
                        </GridCol>
                    </GridRow>
                </GridContainer>
            </Section>

            <Section spacingBottom="4">
                <GridContainer>
                    <PostsWrapper>
                        {state.posts.map(post => (
                            <ArchivePost key={post['_id']} post={post} imgHeight={postSizePercentage} showDate={false} />
                        ))}
                    </PostsWrapper>
                </GridContainer>
            </Section>
            
            { showGetPostsButton &&
            <Section spacingTop="1"  spacingBottom="5">
                <GridContainer justify="center">
                    <Button size="small" primary onClick={handleMorePostsClick}>More {viewAllName}</Button>
                </GridContainer>
            </Section> 
            } 
        </>
    )
}

CategoryPage.propTypes = {
    categoryData: PropTypes.object.isRequired,
    postData: PropTypes.object,
    postSizePercentage: PropTypes.number.isRequired
}

const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: -80px;

    ${responsiveBreakpointDown('mobile', `margin-bottom: -60px;`)}

    > * {
        margin-bottom: 80px;

        ${responsiveBreakpointDown('mobile', `margin-bottom: 60px;`)}
    }
`

const Title = styled.h1`
    margin-bottom: 0;
`
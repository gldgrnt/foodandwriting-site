import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Section, GridContainer, GridRow, GridCol, Page } from '../components/layout'
import { responsiveBreakpointDown, SEO } from '../utils'
import { ArchivePost } from '../components/page-sections'
import { Button } from '../components/ui'

export default ({ category, posts, getMorePosts }) => {
    // Variables
    const { title, seoDescription, viewAllName } = category
    const showGetPostsButton = posts.length < posts.totalCount
    const postSizePercentage = category.categoryType === 'Normal' ? 67 : 120

    return (
        <>
            <SEO description={seoDescription} title={title} />
            
            <Page>
                <Section spacingTop="2" spacingBottom={{'monitor': 3, 'tablet': 2}}>
                    <GridContainer>
                        <GridRow>
                            <GridCol cols="4">
                                <Title>{category.title}</Title>
                            </GridCol>
                        </GridRow>
                    </GridContainer>
                </Section>

                <Section spacingBottom="4">
                    <GridContainer>
                        <PostsWrapper>
                            {posts.map(({node}) => (
                                <ArchivePost key={node._id} post={node} imgHeight={postSizePercentage} showDate={false} />
                            ))}
                        </PostsWrapper>
                    </GridContainer>
                </Section>
                
                { showGetPostsButton &&
                    <Section spacingTop="1"  spacingBottom="5">
                        <GridContainer justify="center">
                            <Button size="small" primary onClick={getMorePosts}>More {viewAllName}</Button>
                        </GridContainer>
                    </Section> 
                }
            </Page>
        </>
    )
}

// Add in prop types

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
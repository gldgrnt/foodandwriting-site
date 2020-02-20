import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Section, GridContainer, GridRow, GridCol } from '../layout'
import { responsiveBreakpointDown } from '../../utils'
import { ArchivePost } from '../page-sections'
import { Button } from '../ui'

export const PageCategory = ({ categoryData, postData, postSizePercentage }) => {

    const [posts, setPosts] = useState(postData.nodes)

    const { title, categoryOptions: {viewAllName} } = categoryData
    const { totalCount } = postData

    // Load more logic
    const showMore = posts.length < totalCount

    return (
        <>
            <Section spacingTop={{'monitor': 3, 'tablet': 2}} spacingBottom={{'monitor': 3, 'tablet': 2}}>
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
                        {posts.map(post => (
                            <ArchivePost key={post.id} post={post} imgHeight={postSizePercentage} />
                        ))}
                    </PostsWrapper>
                </GridContainer>
            </Section>
            
            { showMore &&
            <Section spacingTop="1"  spacingBottom="5">
                <GridContainer justify="center">
                    <Button size="small" primary>More {viewAllName}</Button>
                </GridContainer>
            </Section> 
            } 
        </>
    )
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
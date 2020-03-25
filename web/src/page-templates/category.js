import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Section, GridContainer, GridRow, GridCol, Page } from '../components/layout'
import { responsiveBreakpointDown, SEO } from '../utils'
import { ArchivePost } from '../components/page-sections'
import { Button } from '../components/ui'

/**
 * Category component 
 */
export const Category = ({ category: {title, seoDescription, viewAllName, categoryType}, posts, showButton, getMorePosts }) => {
    // Variables
    const postSizePercentage = categoryType === 'Normal' ? 67 : 120

    return (
        <>
            <SEO description={seoDescription} title={title} />
            
            <Page>
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
                            {posts.map(({node}) => (
                                <ArchivePost key={node._id} post={node} imgHeight={postSizePercentage} showDate={false} />
                            ))}
                        </PostsWrapper>
                    </GridContainer>
                </Section>
                
                { showButton &&
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

/**
 * PropTypes
 */
Category.propTypes = {
    category: PropTypes.shape({
        title: PropTypes.string.isRequired,
        seoDescription: PropTypes.string, // This is technically required but not yet
        viewAllName: PropTypes.string.isRequired,
        categoryType: PropTypes.string.isRequired
    }).isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired,
            }),
            catgegory: PropTypes.shape({
                singleName: PropTypes.string.isRequired,
                slug: PropTypes.shape({
                    current: PropTypes.string.isRequired
                })
            }),
            featuredImage: PropTypes.shape({
                asset: PropTypes.object.isRequired
            })
        })
    })),
    showButton: PropTypes.bool.isRequired,
    getMorePosts: PropTypes.func.isRequired
}

/**
 * Styles
 */
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
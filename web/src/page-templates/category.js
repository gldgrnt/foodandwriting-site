import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PostArchive } from '../components/page-sections'
import { Section, GridContainer, GridRow, GridCol, Page } from '../components/layout'
import { SEO } from '../utils'
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
                    <PostArchive posts={posts} postSizePercentage={postSizePercentage} showDate={categoryType === 'Normal'} />
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
    posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    showButton: PropTypes.bool.isRequired,
    getMorePosts: PropTypes.func.isRequired
}

/**
 * Styles
 */
const Title = styled.h1` 
    margin-bottom: 0;
`
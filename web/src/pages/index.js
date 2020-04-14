import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Page } from '../components/layout'
import { SEO } from '../utils'
import { FeaturedPost, PostSlider, PostList, FeaturedTopic } from '../components/page-sections'
import { GridContainer, GridRow, GridCol, Section } from '../components/layout'

/**
 * IndexPage component
 */
const IndexPage = ({data: { recipes, featuredTopic, blog, blogPosts, culture, culturePosts }}) => {

    // Destructure to separate the data
    const [featuredRecipe, ...sliderRecipes] = recipes.nodes
    const { featuredTopicTitle, featuredTopicSubtitle, featuredTopicPosts } = featuredTopic

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>
                {/* Main post */}
                <Section>
                    <FeaturedPost post={featuredRecipe} />
                </Section>

                {/* Post slider */}
                <Section spacingTop={{'monitor': 3, 'tablet': 2}} spacingBottom={{'monitor': 4, 'tablet': 2}}>
                    <PostSlider title={'Recipes'} posts={sliderRecipes} />
                </Section>

                {/* Featured section */}
                <Section spacingTop={{'monitor': 4, 'tablet': 3}} spacingBottom={{'monitor': 4, 'tablet': 3}} whiteGrey>
                    <FeaturedTopic title={featuredTopicTitle} subtitle={featuredTopicSubtitle} posts={featuredTopicPosts} />
                </Section>

                {/* Horizontal post list section */}
                <Section spacingTop={{'monitor': 4, 'tablet': 3}} spacingBottom={{'monitor': 4, 'tablet': 3}}>
                    <GridContainer>
                        <GridRow>
                            {/* Blog */}
                            <GridCol cols={{'monitor': 4, 'laptop': 8}}>
                                <Section as="div" spacingBottom={{'laptop': 4, 'tablet': 3}}>
                                    <PostList category={blog} posts={blogPosts.nodes} />
                                </Section>
                            </GridCol>

                            <GridCol cols={{'monitor': 4, 'laptop': 8}}>
                                <PostList category={culture} posts={culturePosts.nodes} />
                            </GridCol>
                        </GridRow>
                    </GridContainer>
                </Section>

                {/* Main post */}
                {/* <Section spacingBottom="6">
                    <FeaturedPost post={mainPostData} />
                </Section> */}
            </Page>
        </>
    )
}

export default IndexPage


/**
 * PropTypes
 */
IndexPage.propTypes = {
    data: PropTypes.shape({
        recipes: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired, 
        featuredTopic: PropTypes.shape({
            featuredTopicTitle: PropTypes.string.isRequired,
            featuredTopicSubtitle: PropTypes.string.isRequired,
            featuredTopicPosts: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired, 
        blog: PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            }).isRequired,
            viewAllName: PropTypes.string.isRequired
        }).isRequired, 
        blogPosts: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired, 
        culture: PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            }).isRequired,
            viewAllName: PropTypes.string.isRequired
        }).isRequired, 
        culturePosts: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }).isRequired
}


/**
 * GraphQL query
 */
export const homepageQuery = graphql`
    query {
        # Recipes
        recipes: allSanityPost(filter: {category: {title: {eq: "Recipes"}}}, limit: 7, sort: {order: DESC, fields: date}) {
            nodes {
                ...PreviewPostFragment
                # Recipe intro
                content {
                    ... on SanityRecipeContent {
                        recipeIntro
                    }
                }
            }
        }
        # Featured topic
        featuredTopic: sanityHome {
            featuredTopicTitle
            featuredTopicSubtitle
            featuredTopicPosts {
                ...PreviewPostFragment
            }
        }
        # Blog
        blog: sanityCategory(title: {eq: "Blog"}) {
            title
            slug {
                current
            }
            viewAllName
        }
        blogPosts: allSanityPost(limit:3, filter: {category: {title: {eq: "Blog"}}}, sort: {order: DESC, fields: date}) {
            nodes {
                ...PreviewPostFragment
            }
        }
        # Culture
        culture: sanityCategory(title: {eq: "Culture"}) {
            title
            slug {
                current
            }
            viewAllName
        }
        culturePosts: allSanityPost(limit:3, filter: {category: {title: {eq: "Culture"}}}, sort: {order: DESC, fields: date}) {
            nodes {
                ...PreviewPostFragment
            }
        }
    }
    
`
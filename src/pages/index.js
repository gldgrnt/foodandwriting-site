import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { PageContext } from '../components/context'
import { Page } from '../components/layout'
import { SEO } from '../utils'
import { FeaturedPost, RecipeSlider, PostList, FeaturedTopic } from '../components/page-sections'
import { GridContainer, GridRow, GridCol, Section } from '../components/layout'

/**
 * IndexPage component
 */
const IndexPage = ({ data: { featured, recipes, blog, blogPosts, culture, culturePosts } }) => {

    // Sort featured
    const { featuredRecipe, featuredRecipeDescription, featuredTopicTitle, featuredTopicSubtitle, featuredTopicPosts } = featured // Setup featured items

    // Sort recipes
    const recipePosts = recipes.nodes.filter(({ _id }) => _id !== featuredRecipe._id) // Remove featured post from recipe array if it's in there
    const mobileRecipePosts = [featuredRecipe, ...recipePosts] // Add featured post to the slider on mobile if it's a recipe

    return (
        <>
            <SEO title="Home" />
            <Page>
                {/* Featured post */}
                <Section hideOnMobile={true}>
                    <FeaturedPost post={featuredRecipe} description={featuredRecipeDescription} />
                </Section>

                {/* Post slider */}
                <PageContext.Consumer>
                    {({ isMobile }) => (
                        <Section spacingTop={{ 'monitor': 3, 'tablet': 2, 'mobile': 0 }} spacingBottom={{ 'monitor': 4, 'tablet': 2, 'mobile': 0 }}>
                            <RecipeSlider title={'Recipes'} posts={isMobile ? mobileRecipePosts : recipePosts} />
                        </Section>
                    )}
                </PageContext.Consumer>

                {/* Featured section */}
                <Section spacingTop={{ 'monitor': 4, 'tablet': 3, 'mobile': 2 }} spacingBottom={{ 'monitor': 4, 'tablet': 3, 'mobile': 2 }} whiteGrey>
                    <FeaturedTopic title={featuredTopicTitle} subtitle={featuredTopicSubtitle} posts={featuredTopicPosts} />
                </Section>

                {/* Horizontal post list section */}
                <Section spacingTop={{ 'monitor': 4, 'tablet': 3 }} spacingBottom={{ 'monitor': 4, 'tablet': 3 }}>
                    <GridContainer>
                        <GridRow>
                            {/* Blog */}
                            <GridCol cols={{ 'monitor': 4, 'laptop': 8 }}>
                                <Section as="div" spacingBottom={{ 'laptop': 4, 'tablet': 3 }}>
                                    <PostList category={blog} posts={blogPosts.nodes} />
                                </Section>
                            </GridCol>

                            <GridCol cols={{ 'monitor': 4, 'laptop': 8 }}>
                                <PostList category={culture} posts={culturePosts.nodes} />
                            </GridCol>
                        </GridRow>
                    </GridContainer>
                </Section>
            </Page>
        </>
    )
}


/**
 * GraphQL query
 */
export default () => (
    <StaticQuery query={
        graphql`
            query {
                # Featured items
                featured: sanityHome {
                    # Recipe
                    featuredRecipe {
                        ...PreviewPostFragment
                        ...LargeFluidImageFragment
                    }
                    featuredRecipeDescription
                    # Topic
                    featuredTopicTitle
                    featuredTopicSubtitle
                    featuredTopicPosts {
                        ...PreviewPostFragment
                        ...MediumFluidImageFragment
                    }
                }
                # Recipes
                recipes: allSanityPost(filter: {category: {title: {eq: "Recipes"}}}, limit: 7, sort: {order: DESC, fields: date}) {
                    nodes {
                        ...PreviewPostFragment
                        ...MediumFluidImageFragment
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
                        ...SmallFluidImageFragment
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
                        ...SmallFluidImageFragment
                    }
                }
            }
            
        `
    }

        render={data => <IndexPage data={data} />}
    />
)


/**
 * PropTypes
 */
IndexPage.propTypes = {
    data: PropTypes.shape({
        recipes: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired,
        featured: PropTypes.shape({
            featuredRecipe: PropTypes.object.isRequired,
            featuredRecipeDescription: PropTypes.string.isRequired,
            featuredTopicTitle: PropTypes.string.isRequired,
            featuredTopicSubtitle: PropTypes.string.isRequired,
            featuredTopicPosts: PropTypes.array.isRequired,
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
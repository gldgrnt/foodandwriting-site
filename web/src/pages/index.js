import React from 'react'
import { graphql } from 'gatsby'
import { Page } from '../components/layout'
import { SEO } from '../utils'
import { FeaturedPost, PostSlider, PostList, FeaturedTopic, ParallaxFeaturedTopic } from '../components/page-sections'
import { GridContainer, GridRow, GridCol, Section } from '../components/layout'

const IndexPage = ({ data }) => {

    const mainPostData = data.mainPost.edges[0].node
    const recipeCategoryData = data.recipeCategory.edges[0].node

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>

                {/* Main post */}
                <Section spacingTop={{ 'monitor': 2, 'desktop': 0 }}>
                    <FeaturedPost post={mainPostData} />
                </Section>

                {/* Post slider */}
                <Section spacingTop="3" spacingBottom="7">
                    <PostSlider title={'Recipes'} posts={[mainPostData, mainPostData, mainPostData, mainPostData, mainPostData, mainPostData]} />
                </Section>

                {/* Featured section */}
                <Section spacingTop="3" spacingBottom="4" whiteGrey>
                    <FeaturedTopic topic={{ 'smallTitle': 'Featured topic small title', 'title': 'Featured topic description sentence text' }} posts={[mainPostData, mainPostData]} />
                </Section>

                {/* Horizontal post list section */}
                <Section spacingTop="6" spacingBottom="6">
                    <GridContainer>
                        <GridRow>
                            <GridCol cols="4">
                                <PostList category={{ title: 'Culture', link: '/culture' }} posts={[mainPostData, mainPostData, mainPostData]} />
                            </GridCol>

                            <GridCol cols="4">
                                <PostList category={{ title: 'Culture', link: '/culture' }} posts={[mainPostData, mainPostData, mainPostData]} />
                            </GridCol>
                        </GridRow>
                    </GridContainer>
                </Section>

                {/* Parallax topic section */}
                <Section>
                    <ParallaxFeaturedTopic topic={{recipeCategoryData}}/>
                </Section>

                {/* Main post */}
                <Section spacingTop="6" spacingBottom="6">
                    <FeaturedPost post={mainPostData} />
                </Section>
            </Page>
        </>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query HomePagequery {
        mainPost:allSanityRecipe(limit: 1, sort: {fields: _createdAt, order: DESC}) {
            edges {
                node {
                    id,
                    _type,
                    title,
                    slug {
                        current
                    },
                    featuredImage {
                    alt,
                    asset {
                        fluid {
                                srcWebp
                            }
                        }   
                    },
                    recipeIntro,
                    _createdAt
                    category {
                        slug {
                            current
                        }
                    }
                }
            }
        },
        recipeCategory:allSanityRecipeCategory {
            edges {
                node {
                    title
                    slug {
                        current
                    }
                    seoDecsription
                    categoryOptions {
                        coverPhoto {
                            asset {
                                fluid(maxWidth: 1920) {
                                    base64
                                    aspectRatio
                                    src
                                    srcSet
                                    srcWebp
                                    srcSetWebp
                                    sizes
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `
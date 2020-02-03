import React from 'react'
import { graphql } from 'gatsby'
import { Page } from '../components/layout'
import { SEO } from '../utils'
import { FeaturedPost, PostSlider, PostList } from '../components/post-sections'
import { GridContainer, GridRow, GridCol, Section } from '../components/layout'

const IndexPage = ({ data }) => {

    const mainPostData = data.mainPost.edges[0].node

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>

                {/* Main post */}
                <Section spacingTop="2">
                    <FeaturedPost post={mainPostData} />
                </Section>

                {/* Post slider */}
                <Section spacingTop="3">
                    <PostSlider title={'Recipes'} posts={[mainPostData, mainPostData, mainPostData, mainPostData, mainPostData, mainPostData]} />
                </Section>

                {/* Horizontal post section */}
                <Section spacingTop="3">
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
        }
    }
    `
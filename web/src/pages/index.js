import React from 'react'
import { graphql } from 'gatsby'
import { Page } from '../components/layout'
import { SEO } from '../utils'

import { FeaturedPost, PostSlider } from '../components/page-sections'
import { Section } from '../components/layout'
// import { FeaturedPost, PostSlider, PostList, FeaturedTopic } from '../components/page-sections'
// import { GridContainer, GridRow, GridCol, Section } from '../components/layout'

const IndexPage = ({ data: { recipesData } }) => {

    // Set up post data
    const featuredRecipe = recipesData.edges[0].node
    const sliderRecipes = recipesData.edges.filter((edge, index) => index !== 0)

    // 1. 6 Recipes -> split into 1 & 5 - DONE
    // 2. Blog category -> up to three posts
    // 3. Culture cateogy -> up to three posts


    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>

                {/* Main post */}
                <Section>
                    <FeaturedPost post={featuredRecipe} />
                </Section>

                {/* Post slider */}
                <Section spacingTop="3" spacingBottom="7">
                    <PostSlider title={'Recipes'} posts={sliderRecipes} />
                </Section>

                {/* Featured section */}
                {/* <Section spacingTop="5" spacingBottom="6" whiteGrey>
                    <FeaturedTopic topic={{ 'smallTitle': 'Featured topic small title', 'title': 'Featured topic description sentence text' }} posts={[mainPostData, mainPostData]} />
                </Section> */}

                {/* Horizontal post list section */}
                {/* <Section spacingTop="6" spacingBottom="6">
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
                </Section> */}

                {/* Main post */}
                {/* <Section spacingBottom="6">
                    <FeaturedPost post={mainPostData} />
                </Section> */}
            </Page>
        </>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query HomePagequery {
        recipesData: allSanityRecipe(limit: 6, sort: {order: ASC, fields: postMeta___date}) {
            edges {
                node {
                    postMeta {
            slug {
              current
            }
            category {
              ... on SanityRecipeCategory {
                id
                slug {
                  current
                }
                categoryOptions {
                  singleName
                }
              }
            }
          }
          recipeIntro
          title
          featuredImage {
            asset {
              id
              fluid {
                ...GatsbySanityImageFluid_noBase64
              }
            }
          }
                }
            }
        }
    }
`
import React from 'react'
import { graphql } from 'gatsby'
import { Page } from '../components/layout'
import { SEO } from '../utils'

import { FeaturedPost, PostSlider, PostList, FeaturedTopic } from '../components/page-sections'
import { GridContainer, GridRow, GridCol, Section } from '../components/layout'
import { PreviewPostFragment } from '../graphql'

const IndexPage = ({data: { recipes }}) => {

    // Destructure to get featuredRecipe and sliderRecipes
    const [featuredRecipe, ...sliderRecipes] = recipes.edges

    // const { featuredTopicTitle, featuredTopicSubtitle, featuredTopicPosts } = featuredTopicData

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>
                {/* Main post */}
                <Section>
                    <FeaturedPost post={featuredRecipe.node} />
                </Section>

                {/* Post slider */}
                <Section spacingTop={{'monitor': 3, 'tablet': 2}} spacingBottom={{'monitor': 4, 'tablet': 2}}>
                    <PostSlider title={'Recipes'} posts={sliderRecipes} />
                </Section>

                {/* Featured section */}
                <Section spacingTop={{'monitor': 4, 'tablet': 3}} spacingBottom={{'monitor': 4, 'tablet': 3}} whiteGrey>
                    {/* <FeaturedTopic title={featuredTopicTitle} subtitle={featuredTopicSubtitle} posts={featuredTopicPosts} /> */}
                </Section>

                {/* Horizontal post list section */}
                <Section spacingTop={{'monitor': 4, 'tablet': 3}} spacingBottom={{'monitor': 4, 'tablet': 3}}>
                    <GridContainer>
                        <GridRow>
                            {/* Blog */}
                            <GridCol cols={{'monitor': 4, 'laptop': 8}}>
                                {/* <Section as="div" spacingBottom={{'laptop': 4, 'tablet': 3}}>
                                    <PostList category={blogListCategoryData} posts={blogListPostsData.edges} />
                                </Section> */}
                            </GridCol>

                            <GridCol cols={{'monitor': 4, 'laptop': 8}}>
                                {/* <PostList category={cultureListCategoryData} posts={cultureListPostsData.edges} /> */}
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

export const pageQuery = graphql`
    query HomePagequery {
        # Recipes
        recipes: allSanityPost(limit: 7, sort: {order: DESC, fields: date}, filter: {category: {title: {eq: "Recipes"}}}) {
            edges {
                node {
                    ...PreviewPostFragment
                    # Recipe intro
                    content {
                        ... on SanityRecipeContent {
                            recipeIntro
                        }
                    }
                }
            }
        }

        ## Featured topic data
        # featuredTopicData: sanityHome {
        #     featuredTopicTitle
        #     featuredTopicSubtitle
        #     featuredTopicPosts {
        #     ... on SanityBlog {
        #         featuredImage {
        #         alt
        #         asset {
        #             fluid {
        #                 ...GatsbySanityImageFluid_noBase64
        #             }
        #         }
        #         }
        #         title
        #         postMeta {
        #         category {
        #             ... on SanityBlogCategory {
        #             slug {
        #                 current
        #             }
        #             }
        #         }
        #         slug {
        #             current
        #         }
        #         }
        #     }
        #     ... on SanityCulture {
        #         featuredImage {
        #         alt
        #         asset {
        #             fluid {
        #                 ...GatsbySanityImageFluid_noBase64
        #             }
        #         }
        #         }
        #         title
        #         postMeta {
        #         category {
        #             ... on SanityCultureCategory {
        #             slug {
        #                 current
        #             }
        #             }
        #         }
        #         slug {
        #             current
        #         }
        #         }
        #     }
        #     ... on SanityRecipe {
        #         featuredImage {
        #         alt
        #         asset {
        #             fluid {
        #                 ...GatsbySanityImageFluid_noBase64
        #             }
        #         }
        #         }
        #         title
        #         postMeta {
        #         category {
        #             ... on SanityRecipeCategory {
        #             slug {
        #                 current
        #             }
        #             }
        #         }
        #         slug {
        #             current
        #         }
        #         }
        #     }
        #     }
        # }

        # ## Post list data
        # # Blog
        # blogListCategoryData: sanityBlogCategory {
        #     slug {
        #     current
        #     }
        #     title
        #     categoryOptions {
        #     viewAllName
        #     }
        # }
        # blogListPostsData: allSanityBlog(limit: 3) {
        #     edges {
        #     node {
        #         id
        #         title
        #         postMeta {
        #         slug {
        #             current
        #         }
        #         date
        #         category {
        #             ... on SanityBlogCategory {
        #             slug {
        #                 current
        #             }
        #             }
        #         }
        #         }
        #         featuredImage {
        #         alt
        #         asset {
        #             fluid {
        #                 ...GatsbySanityImageFluid_noBase64
        #             }
        #         }
        #         }
        #     }
        #     }
        # }

        # # Culture
        # cultureListCategoryData: sanityCultureCategory {
        #     slug {
        #     current
        #     }
        #     title
        #     categoryOptions {
        #     viewAllName
        #     }
        # }
        # cultureListPostsData: allSanityCulture(limit: 3) {
        #     edges {
        #     node {
        #         id
        #         title
        #         postMeta {
        #         slug {
        #             current
        #         }
        #         date
        #         category {
        #             ... on SanityCultureCategory {
        #             slug {
        #                 current
        #             }
        #             }
        #         }
        #         }
        #         featuredImage {
        #         alt
        #         asset {
        #             fluid {
        #                 ...GatsbySanityImageFluid_noBase64
        #             }
        #         }
        #         }
        #     }
        #     }
        # }

    }
    
`
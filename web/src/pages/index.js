import React from "react"
import { Page, SEO } from '../components/global'
import { graphql } from 'gatsby'
import { FeaturedPost, PostSlider } from '../components/posts-sections'

const IndexPage = ({ data }) => {

    const mainPostData = data.mainPost.edges[0].node

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>

                {/* Main post */}
                <FeaturedPost post={mainPostData} />

                {/* Post slider */}
                <PostSlider title={'Recipes'} posts={[mainPostData, mainPostData, mainPostData, mainPostData, mainPostData, mainPostData]} />
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
                    recipeIntro
                }
            }
        }
    }
    `
import React from "react"
import { graphql } from 'gatsby'

import { SEO } from '../utils'
import { PostHero, PostBlockContent, PostMainContent } from '../components/post-sections'
import { Page, Section } from '../components/layout'

export default ({ data: {post: {title, category, featuredImage, seoDescription}} }) => {

    return (
        <>
            <SEO title={`${title} recipe`} description={ seoDescription } />
            <Page>
                <Section>
                    <PostHero featuredImage={featuredImage} subtitle={category.title} title={title} />
                </Section>

                {/* <PostMainContent>
                    <PostBlockContent content={_rawContent}/>
                </PostMainContent> */}
            </Page>
        </>
    )
}

/**
 * Page query
 */
export const query = graphql`
  query ($_id: String, $isDefaultPost: Boolean!) {
    post: sanityPost(_id: {eq: $_id}) {
        title
        seoDescription
        date
        category {
            title
            slug {
                current
            }
        }
        featuredImage {
            asset {
                fluid {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
        # Get either the default content on recipe content based on the category type
        content @include(if: $isDefaultPost) {
            ...on SanityDefaultContent  {
                _type
            }
        }
        content @skip(if: $isDefaultPost) {
            ...on SanityRecipeContent  {
                _type
            }
        }
    }
  }
`
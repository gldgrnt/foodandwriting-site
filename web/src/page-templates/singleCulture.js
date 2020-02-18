import React from "react"
import { graphql } from 'gatsby'

import { SEO } from '../utils'
import { PostHero, PostBlockContent, PostMainContent } from '../components/post-sections'
import { Page, Section } from '../components/layout'

export default ({ data }) => {

    const { title, postMeta, featuredImage, seoDescription, _rawContent } = data.post

    return (
        <>
            <SEO title={`${title} recipe`} description={ seoDescription } />
            <Page>
                <Section>
                    <PostHero featuredImage={featuredImage} subtitle={postMeta.category.categoryOptions.singleName} title={title} />
                </Section>

                <PostMainContent>
                    <PostBlockContent content={_rawContent}/>
                </PostMainContent>
            </Page>
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        post: sanityCulture(id: {eq: $id}) {
            title
            postMeta {
            seoDescription
            date
            category {
                ... on SanityCultureCategory {
                id
                categoryOptions {
                    singleName
                }
                }
            }
            }
            featuredImage {
                asset {
                    fluid {
                    ...GatsbySanityImageFluid_noBase64
                    }
                }  
            }
            _rawContent(resolveReferences: {maxDepth: 10})
        }
    }
`
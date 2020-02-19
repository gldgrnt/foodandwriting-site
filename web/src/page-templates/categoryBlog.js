import React from 'react'
import { graphql } from 'gatsby'

import { Page, PageCategory } from '../components/layout'
import { SEO } from '../utils'

export default ({ data: { categoryData, postData } }) => {
    
    const { title, seoDescription } = categoryData
    
    return (
        <>
            <SEO description={seoDescription} title={title} />
            
            <Page>
                <PageCategory categoryData={categoryData} postData={postData} postSizePercentage={67} />
            </Page>
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        categoryData: sanityBlogCategory(id: {eq: $id}) {
        categoryOptions {
        singleName
        viewAllName
        }
        seoDecsription
        title
    }
        postData: allSanityBlog(limit: 6) {
        totalCount
        nodes {
        id
        postMeta {
            category {
            ... on SanityBlogCategory {
                id
                slug {
                current
                }
                categoryOptions {
                    singleName
                }
            }
            }
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
        title
        }
    }
    }
`
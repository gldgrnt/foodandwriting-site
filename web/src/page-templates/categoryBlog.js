import React from 'react'
import { graphql } from 'gatsby'

import { Page } from '../components/layout'
import { CategoryPage } from '../components/page-wrappers'
import { SEO } from '../utils'

export default ({ data: { categoryData, postData } }) => {
    
    const { title, seoDescription } = categoryData
    
    return (
        <>
            <SEO description={seoDescription} title={title} />
            
            <Page>
                <CategoryPage categoryData={categoryData} postData={postData} postSizePercentage={67} />
            </Page>
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        categoryData: sanityBlogCategory(id: {eq: $id}) {
        _id
        categoryOptions {
        singleName
        viewAllName
        }
        seoDecsription
        title
    }
        postData: allSanityBlog(limit: 9) {
        totalCount
        nodes {
        _id
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
            date
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
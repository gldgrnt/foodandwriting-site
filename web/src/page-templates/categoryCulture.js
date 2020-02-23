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
        categoryData: sanityCultureCategory(id: {eq: $id}) {
        _id
        categoryOptions {
        singleName
        viewAllName
        }
        seoDecsription
        title
    }
        postData: allSanityCulture(limit: 6) {
        totalCount
        nodes {
        id
        postMeta {
            category {
            ... on SanityCultureCategory {
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
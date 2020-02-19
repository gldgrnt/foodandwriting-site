import React from 'react'
import { graphql } from 'gatsby'

import { Page, PageCategory } from '../components/layout'

export default ({ data: { categoryData, postData } }) => {

    return (
        <>
            <Page>
                <PageCategory categoryData={categoryData} postData={postData} postSizePercentage={67} />
            </Page>
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        categoryData: sanityCultureCategory(id: {eq: $id}) {
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
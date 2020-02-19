import React from 'react'
import { graphql } from 'gatsby'

import { PageCategory } from '../components/layout'

export default ({ data: { categoryData, postsData } }) => {
    
    return (
        <>
            <PageCategory categoryData={categoryData} postData={postsData} postSizePercentage={120} />
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        categoryData: sanityRecipeCategory(id: {eq: $id}) {
        categoryOptions {
        singleName
        viewAllName
        }
        seoDecsription
        title
    }
    postsData: allSanityRecipe(limit: 6) {
        totalCount
        nodes {
        id
        postMeta {
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
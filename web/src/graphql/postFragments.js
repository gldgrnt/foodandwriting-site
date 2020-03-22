import { graphql } from 'gatsby'

/**
 * Archive post fragment
 */
export const previewPostFragment = graphql`
    fragment PreviewPostFragment on SanityPost {
        _id
        title
        slug {
            current
        }
        featuredImage {
            asset {
                fluid {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
        category {
            slug {
                current
            }
            singleName
        }
    }
`
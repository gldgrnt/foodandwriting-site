import { graphql } from "gatsby"

/**
 * Archive post category fragment
 */
export const fullCategoryFragment = graphql`
    fragment FullCategoryFragment on SanityCategory {
        _id
        title
        seoDecsription
        singleName
        viewAllName
        slug {
            current
        }
        categoryType
    }
`

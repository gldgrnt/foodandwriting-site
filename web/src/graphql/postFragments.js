import { graphql } from 'gatsby'

/**
 * Archive post fragment
 */
export const previewPostFragment = graphql`
    fragment PreviewPostFragment on SanityPost {
        _id
        title
        date
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
            categoryType
        }
    }
`

/**
 * Post page fragment
 */
export const FullPostFragment = graphql`
    fragment FullPostFragment on SanityPost {
        title
        seoDescription
        date
        category {
            title
            slug {
                current
            }
            categoryType
            viewAllName
        }
        featuredImage {
            asset {
                fluid {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
        relatedPosts {
            ...PreviewPostFragment
        }
    }
`

/**
 * Post content fragments
 */
export const RecipePostContentFragment = graphql`
    fragment RecipePostContentFragment on SanityRecipeContent {
        _type
        difficulty
        readyIn
        recipeIntro
        recipeNotes
        serves
        steps
        shoppingList {
            amount
            ingredient
            _key
        }
    }
`
import { graphql } from 'gatsby'

/**
 * Archive post fragment
 */
export const PreviewPostFragment = graphql`
    fragment PreviewPostFragment on SanityPost {
        _id
        title
        date
        fullSlug
        category {
            singleName
            categoryType
        }
        content {
            ...on SanityRecipeContent  {
                ...RecipePostContentFragment
            }
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
        ...LargeFluidImageFragment
        relatedPosts {
            ...PreviewPostFragment
            ...SmallFluidImageFragment
        }
    }
`

/**
 * Preview Recipe content fragments
 */
export const PreviewRecipePostContentFragment = graphql`
    fragment PreviewRecipePostContentFragment on SanityRecipeContent {
        difficulty
        readyIn
        serves
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
/**
 * Recipe posts
 */
const postQuery = `
    {   
        algoliaPosts: allSanityPost {
            nodes {
                _id
                title
                date
                fullSlug
                featuredImage {
                    asset {
                        fluid(maxWidth: 200, maxHeight: 200) {
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                        }
                    }
                }
                category {
                    singleName
                    categoryType
                }
                content {
                    ... on SanityRecipeContent {
                        shoppingList {
                            ingredient
                        }
                    }
                }
            }
        }
    }
`

/**
 * Flatten the post queries
 *
 * @param {[]} arr array of posts
 * @returns {[]} Flattened array
 */
const flattenRecipes = arr =>
    // Map each post to a flatten object
    arr.map(
        ({ _id, title, date, fullSlug, category, content, featuredImage }) => {
            // Data shared by normal and recipe posts
            const mainData = {
                _id,
                title,
                date,
                timestamp: new Date(date).getTime(),
                fullSlug,
                categoryName: category.singleName,
                categoryType: category.categoryType,
                featuredImage,
            }

            // Flatten post objects based on category type
            switch (category.categoryType) {
                case "Normal":
                    return {
                        ...mainData,
                    }

                case "Recipe":
                    let shoppingListItems = content[0].shoppingList.map(
                        item => item.ingredient
                    )

                    return {
                        ...mainData,
                        shoppingList: shoppingListItems,
                    }

                default:
                    return
            }
        }
    )

/**
 *  Export algolia query
 */

const algoliaQueries = [
    {
        query: postQuery,
        transformer: ({ data }) => flattenRecipes(data.algoliaPosts.nodes),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    },
]

module.exports = algoliaQueries

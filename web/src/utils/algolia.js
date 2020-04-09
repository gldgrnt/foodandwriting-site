/**
 * Recipe posts
 */
const postQuery = `
    {   
        algoliaPosts: allSanityPost {
            nodes {
                title
                date
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
const flattenRecipes = ( arr ) => (
    // Map each post to a flatten object
    arr.map( ({ title, date, category, content }) => {

        // Flatten post objects based on category type
        switch (category.categoryType) { 
            case 'Normal':
                return {
                    title,
                    date,
                    category: category.singleName
                }
            
            case 'Recipe':
                let shoppingListItems = content[0].shoppingList.map( item => item.ingredient )
                
                return {
                    title,
                    date,
                    category: category.singleName,
                    shoppingList: shoppingListItems
                }

            default:
                return
        }
    })
)


/**
 *  Export algolia query
 */

const algoliaQueries = [
    {
        query: postQuery,
        transformer: ({ data }) => flattenRecipes(data.algoliaPosts.nodes),
        indexName: `FOODANDWRITING`
    },
]

module.exports = algoliaQueries
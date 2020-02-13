// Create pages posts
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pagesToCreate = await graphql(`
    {
        allSanityRecipe {
          edges {
            node {
              id
              recipeIntro
              recipeNotes
              postMeta {
                category {
                  ... on SanityRecipeCategory {
                    id
                    categoryOptions {
                      singleName
                    }
                    slug {
                      current
                    }
                  }
                }
                date
                seoDescription
                slug {
                    current
                }
              }
              steps
              shoppingList {
                amount
                itemSearch
              }
              title
            }
          }
        }
      }
    `)

    // Check for errors
    if (pagesToCreate.errors) {
        throw pagesToCreate.errors
    }

    // Recipes
    const recipes = pagesToCreate.data.allSanityRecipe.edges || []

    recipes.forEach((edge, index) => {
        const path = `/${edge.node.postMeta.category.slug.current}/${edge.node.postMeta.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/singleRecipe.js'),
            context: {data: edge.node},
          })
    })

    // Blog posts
    // const blogs = pagesToCreate.data.allSanityBlog.edges || []

    // blogs.forEach((edge, index) => {
    //     const path = `/${edge.node.category.slug.current}/${edge.node.slug.current}`

    //     createPage({
    //         path,
    //         component: require.resolve('./src/page-templates/single.js'),
    //         context: {data: edge.node},
    //       })
    // })
}

// `category {
//     categoryOptions {
//         singleName
//     }
//     slug {
//         current
//     }
// }`
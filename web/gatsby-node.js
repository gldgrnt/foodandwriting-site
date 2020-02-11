// Create pages posts
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pagesToCreate = await graphql(`
        {
            allSanityRecipe {
                edges {
                    node {
                        slug {
                            current
                        }
                        title
                        seoDecsription
                        recipeIntro
                        featuredImage {
                            asset {
                                fluid {
                                    srcSetWebp
                                }
                            }
                          }
                        category {
                            categoryOptions {
                                singleName
                            }
                            slug {
                                current
                            }
                        }
                    }
                }
            }
        }
    `)

    // Check for errors
    if (pagesToCreate.errors) {
        throw pagesToCreate.errors
    }

    const pages = pagesToCreate.data.allSanityRecipe.edges || []

    pages.forEach((edge, index) => {
        const path = `/${edge.node.category.slug.current}/${edge.node.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/singleRecipe.js'),
            context: {data: edge.node},
          })
    })

}
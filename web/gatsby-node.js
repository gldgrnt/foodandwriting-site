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
                        recipeInfo {
                            difficulty
                            readyIn
                            serves
                        }
                        shoppingList {
                            amount
                            itemSearch
                        }
                        steps
                        recipeNotes
                    }
                }
            }
            allSanityBlog {
                edges {
                    node {
                        title
                        slug {
                            current
                        }
                        seoDescription
                        category {
                            title
                            slug {
                                current
                            }
                        }
                        content {
                            _key
                            _type
                            list
                            sanityChildren {
                                _key
                                _type
                                marks
                                text
                            }
                            style
                        }
                        featuredImage {
                            asset {
                                fluid {
                                    srcSetWebp
                                }
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

    // Recipes
    const recipes = pagesToCreate.data.allSanityRecipe.edges || []

    recipes.forEach((edge, index) => {
        const path = `/${edge.node.category.slug.current}/${edge.node.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/singleRecipe.js'),
            context: {data: edge.node},
          })
    })

    // Blog posts
    const blogs = pagesToCreate.data.allSanityBlog.edges || []

    blogs.forEach((edge, index) => {
        const path = `/${edge.node.category.slug.current}/${edge.node.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/single.js'),
            context: {data: edge.node},
          })
    })
}
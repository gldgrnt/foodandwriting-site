// Create pages posts
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pagesToCreate = await graphql(`
        {
            posts: allSanityPost {
                edges {
                    node {
                        _id
                        slug {
                            current
                        }
                        category {
                            slug {
                                current
                            }
                            categoryType
                        }
                    }
                }
            }
            categories: allSanityCategory {
                edges {
                    node {
                        _id
                        slug {
                            current
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

    // Destructure graphql query
    const { posts, categories } = pagesToCreate.data

    // Create post pages
    posts.edges.forEach(({ node }) => {
            let path = `/${node.category.slug.current}/${node.slug.current}`
            let isDefault = node.category.categoryType === 'Normal'

            createPage({
                path,
                component: require.resolve('./src/page-templates/post.js'),
                context: {_id: node._id, isDefaultPost: isDefault},
            })
        }
    )

    // Create category pages
    categories.edges.forEach(({ node }) => {
        let path = `/${node.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/categoryContainer.js'),
            context: {_id: node._id}
        })
    })
}
/**
 * Create pages from graphql
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pagesToCreate = await graphql(`
        {
            posts: allSanityPost {
                edges {
                    node {
                        _id
                        fullSlug
                        category {
                            _id
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
            let path = node.fullSlug
            let isDefault = node.category.categoryType === 'Normal'
            let cat_id = node.category._id

            createPage({
                path,
                component: require.resolve('./src/page-templates/post.js'),
                context: {_id: node._id, cat_id: cat_id, isDefaultPost: isDefault},
            })
        }
    )

    // Create category pages
    categories.edges.forEach(({ node }) => {
        let path = `/${node.slug.current}`

        createPage({
            path,
            component: require.resolve('./src/page-templates/category.js'),
            context: {_id: node._id}
        })
    })
}

/**
 * Create a fullSlug field for posts
 */

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        SanityPost: {
            fullSlug: {
                type: `String`, 
                resolve: (source, args, context, info) => {
                    // Get post slug from source (source = SanityPost)
                    const postSlug = source.slug.current
                    const categoryRef = source.category._ref
                    
                    // Category is only available by reference so we must query the SanityCategory types to get the post's category's slug
                    const categories = context.nodeModel.getAllNodes({
                        type: `SanityCategory`,
                      })
                    
                    // Filter categories by the categoryRef 
                    const categorySlug = categories.filter(category => category.id === categoryRef)[0].slug.current

                    // Return null if any part is empty
                    if (!postSlug || !categorySlug) return null

                    return `/${categorySlug}/${postSlug}`
                }
            },
        }
    }
    createResolvers(resolvers)
  }
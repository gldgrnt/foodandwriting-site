// Create pages posts
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pagesToCreate = await graphql(`
    {
        allSanityRecipe {
          edges {
            node {
              id
              postMeta {
                category {
                  ... on SanityRecipeCategory {
                    slug {
                      current
                    }
                  }
                }
                slug {
                    current
                }
              }
            }
          }
        }
        allSanityBlog {
            edges {
                node {
                  id
                  postMeta {
                    category {
                      ... on SanityBlogCategory {
                        slug {
                          current
                        }
                      }
                    }
                    slug {
                        current
                    }
                  }
                }
            }
        }
        allSanityCulture {
            edges {
                node {
                  id
                  postMeta {
                    category {
                      ... on SanityCultureCategory {
                        slug {
                          current
                        }
                      }
                    }
                    slug {
                        current
                    }
                  }
                }
            }
        }
        sanityBlogCategory {
            slug {
              current
            }
            id
        }
        sanityCultureCategory {
            slug {
              current
            }
            id
        }
        sanityRecipeCategory {
            slug {
              current
            }
            id
        }
      }
    `)

    // Check for errors
    if (pagesToCreate.errors) {
        throw pagesToCreate.errors
    }

    const postPages = [
        {   // Recipes
            'template': './src/page-templates/singleRecipe.js',
            'edges': pagesToCreate.data.allSanityRecipe.edges || []
        },
        {   // Blogs
            'template': './src/page-templates/singleBlog.js',
            'edges': pagesToCreate.data.allSanityBlog.edges || []
        },
        {   // Culture
            'template': './src/page-templates/singleCulture.js',
            'edges': pagesToCreate.data.allSanityCulture.edges || []
        },
    ]

    // Post page loop
    postPages.forEach((page) => {
        let { template, edges} = page

        edges.forEach((edge, index) => {
            let path = `/${edge.node.postMeta.category.slug.current}/${edge.node.postMeta.slug.current}`
    
            createPage({
                path,
                component: require.resolve(template),
                context: {id: edge.node.id},
            })
        })
    })

    // Categories
    const {sanityBlogCategory, sanityCultureCategory, sanityRecipeCategory } = pagesToCreate.data
    const categoryPages = [
        {
            'template': './src/page-templates/categoryBlog.js',
            'category': sanityBlogCategory
        }, 
        {
            'template': './src/page-templates/categoryCulture.js',
            'category': sanityCultureCategory
        }, 
        {
            'template': './src/page-templates/categoryRecipe.js',
            'category': sanityRecipeCategory
        },
    ]
    
    // Category loop
    categoryPages.forEach(({template, category}) => {

        createPage({
            path: `/${category.slug.current}`,
            component: require.resolve(template),
            context: {id: category.id}
        })
    })
}
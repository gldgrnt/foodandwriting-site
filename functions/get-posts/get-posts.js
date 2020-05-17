require('dotenv').config()

// Instantiate sanity client
const sanityClient = require('@sanity/client')

const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET,
    useCdn: true,
})

/**
 * Fetch posts from sanity using the sanityClient js api
 * 
 * @param {{categoryId: string, amount: number, offset: number}} params Params from which we fetch th posts
 * @returns {Promise<array|Error>} Fetched posts array
 */
const fetchSanityPosts = async (params) => {
    const { categoryId, amount, offset } = params

    // Set up array number to get amount of posts
    const start = parseInt(offset)
    const end = start + (parseInt(amount))

    return client.fetch(
        `*[_type == "post" && category._ref == $categoryId] | order(date desc) [$start..$end] {_id, date, title, featuredImage, slug, content, "category": *[_id == ^.category._ref][0] | {slug, singleName}}`,
        { categoryId: categoryId, start: start, end: end }
    )
}

exports.handler = async (event, context) => {
    try {
        // Make sure request is only a post method
        if (event.httpMethod !== "GET") {
            throw { statusCode: 405, body: "Method Not Allowed" }
        }

        // Fetch sanity posts
        const sanityPosts = await fetchSanityPosts(event.queryStringParameters)

        // Preform operations so that the data is in the same format at grapql
        const posts = sanityPosts.map(post => {
            post['fullSlug'] = `/${post.category.slug.current}/${post.slug.current}`

            return post
        })

        return { statusCode: 200, body: JSON.stringify({ posts: posts }) }

    } catch (err) {
        return err
    }
}
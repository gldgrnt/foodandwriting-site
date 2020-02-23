const sanityClient = require('@sanity/client')

const client  = sanityClient({
    projectId: 's1s9nwnc',
    dataset: 'production',
    useCdn: true,
})

const fetchSanityPosts = async (params) => {
    const { categoryId, amount, offset } = params

    // Set up array number to get amount of posts
    const start = parseInt(offset)
    const end = start + (parseInt(amount) - 1)


    return client.fetch(
        `*[postMeta.category._ref == $id] | order(postMeta___date desc) [$start..$end] {_id, title, featuredImage, postMeta, "category": *[_id == ^.postMeta.category._ref][0] | {slug, categoryOptions}}`, 
        { id: categoryId, start: start, end: end}
    )
}

exports.handler = async ( event, context ) => {
    try {
        // Make sure request is only a post method
        if (event.httpMethod !== "GET") {
            throw { statusCode: 405, body: "Method Not Allowed" };
        }

        // Fetch sanity posts
        let sanityPosts = await fetchSanityPosts(event.queryStringParameters)

        // Copy category data into post meta
        const posts = sanityPosts.map(post => {
            post.postMeta.category = post.category
            delete post.category
            return post
        })

        return { statusCode: 200, body: JSON.stringify({ posts: posts })}

    } catch (err) {
        return err
    }
}
const sanityClient = require('@sanity/client')

const client  = sanityClient({
    projectId: 's1s9nwnc',
    dataset: 'production',
    useCdn: true,
})

const fetchSanityPosts = async (params) => {
    const { type, amount, offset } = params

    // Set up array number to get amount of posts
    const number = `[${offset}..${parseInt(offset) + parseInt(amount)}]`

    return client.fetch(`*[_type == "${type}"] | order(postMeta___date desc) ${number}`, '')
}

exports.handler = async ( event, context ) => {
    try {
        // Make sure request is only a post method
        if (event.httpMethod !== "GET") {
            throw { statusCode: 405, body: "Method Not Allowed" };
        }

        // Fetch sanity posts
        const posts = await fetchSanityPosts(event.queryStringParameters) || []


        return { statusCode: 200, body: JSON.stringify({ hello: posts})}

    } catch (err) {
        return err
    }

//     try {
//         return { statusCode: 200, body: JSON.stringify('hello') }
//     } catch (err) {
//         return err
//     }
}
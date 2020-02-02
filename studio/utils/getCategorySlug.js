// Function to get category slug
import sanityClient from 'part:@sanity/base/client'

const getCategorySlug = async (categoryId) => {
    return await sanityClient.fetch(`*[_id=='${categoryId}']`, {})
        .then(res => {
            if (res.length === 0) {
                throw new Error(`Couldn't find category with that ID`)
            }

            return res[0].slug.current
        })
}

export default getCategorySlug
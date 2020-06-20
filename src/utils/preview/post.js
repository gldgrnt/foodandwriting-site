export const postProjection = '{_id, date, title, seoDescription, "_rawFeaturedImage": featuredImage, "_rawContent": content, "category": *[_id == ^.category._ref][0] | {slug, title, viewAllName}}'

export const transformPost = ({ _id, date, title, category, _rawFeaturedImage, seoDescription, _rawContent }) => {

    return {
        sanityPost: {
            _id,
            date,
            title,
            _rawFeaturedImage,
            seoDescription,
            _rawContent,
            category,
            relatedPosts: false
        },
        otherRelatedPosts: false
    }
}
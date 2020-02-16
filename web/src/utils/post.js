import PropTypes from 'prop-types'

export const getPostSlug = (postMeta) => {
    const postLink = postMeta.slug.current
    const categoryLink = postMeta.category.slug.current

    return `/${categoryLink}/${postLink}`
}

getPostSlug.proptypes = {
    postMeta: PropTypes.shape({
        slug: PropTypes.shape({
            current: PropTypes.string.isRequired
        }),
        category: PropTypes.shape({
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            })
        })
    })
}
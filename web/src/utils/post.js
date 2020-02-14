import PropTypes from 'prop-types'

export const getPostSlug = (post) => {
    let postLink = post.postMeta.slug.current
    let categoryLink = post.postMeta.category.slug.current

    return `/${categoryLink}/${postLink}`
}

getPostSlug.proptypes = {
    post: PropTypes.object.isRequired
}
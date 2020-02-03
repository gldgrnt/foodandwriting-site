import PropTypes from 'prop-types'

export const getPostSlug = (post) => {
    let postLink = post.slug.current
    let categoryLink = post.category.slug.current

    return `/${categoryLink}/${postLink}`
}

getPostSlug.proptypes = {
    post: PropTypes.object.isRequired
}
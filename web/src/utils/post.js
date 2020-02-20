import PropTypes from 'prop-types'
import moment from 'moment'

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

export const getPostDate = (date, format = 'DD/MM/YYYY') => {
    return date && {
        'raw': new Date(date),
        'formatted': moment(date).format(format)
    }
}

getPostDate.propTypes = {
    date: PropTypes.string.isRequired
}
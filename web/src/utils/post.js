import moment from 'moment'

export const getPostSlug = (postMeta) => {
    const postLink = postMeta.slug.current
    const categoryLink = postMeta.category.slug.current

    return `/${categoryLink}/${postLink}`
}


export const getPostDate = (date, format = 'DD/MM/YYYY') => {
    return date && {
        'raw': new Date(date),
        'formatted': moment(date).format(format)
    }
}

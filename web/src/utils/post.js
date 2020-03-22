import moment from 'moment'

/**
 * Generate post slug from post object
 * 
 * @param {{slug:{current: string}, category: {slug: {current: string}}}} post Post
 * @returns {string} Post slug based on category
 */
export const getPostSlug = ({slug, category}) => {
    return `/${category.slug.current}/${slug.current}`
}

/**
 * Get a post's date
 * 
 * @param {string} date Date
 * @param {string} [format] Date format
 * @returns {{raw: string, formatted: string}} Raw and formatted date object
 */
export const getPostDate = (date, format = 'DD/MM/YYYY') => {
    return date && {
        'raw': new Date(date),
        'formatted': moment(date).format(format)
    }
}

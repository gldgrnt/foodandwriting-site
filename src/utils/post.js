import moment from 'moment'

/**
 * Generate post slug from post object
 * 
 * @param {{slug:{current: string}, category: {slug: {current: string}}}} post Post
 * @returns {string} Post slug based on category
 */
export const getPostSlug = ({ slug, category }) => {
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


/**
 * Parse readyIn string
 * 
 * @param {String} str String
 * @returns {String} Human readable cooking time
 */
export const parseReadyInString = str => {
    if (!!str === false) return '[Missing]'

    const [hoursNum, minsNum] = str.split(':').map(numStr => Number(numStr)) // Parse string make sure array consituents are numbers

    const hoursStr = hoursNum === 0 ? '' : `${hoursNum} ${hoursNum === 1 ? 'hour' : 'hours'}`
    const minsStr = minsNum === 0 ? '' : `${minsNum} ${minsNum === 1 ? 'minute' : 'minutes'}`
    const spaceStr = hoursStr && minsStr ? ' ' : ''

    return hoursStr + spaceStr + minsStr
}
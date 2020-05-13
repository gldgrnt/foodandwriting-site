import _ from 'lodash'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const sanityConfig = { projectId: process.env.GATSBY_SANITY_PROJECT_ID, dataset: process.env.GATSBY_SANITY_DATASET, }

/**
 * Get gatsby fluid image props from sanity image ID
 * 
 * @param {String} imageAssetId 
 * @returns {Object} Fluid image props
 */
export const getFluidPropsFromId = (imageAssetId = '') => {
    try {
        if (imageAssetId.length < 1) {
            throw new Error('Image id needs to be a non-empty string')
        }

        return getFluidGatsbyImage(imageAssetId, {}, sanityConfig)

    } catch (err) {
        return err
    }
}


/**
 * Get gatsby fluid image props from gatsby featuredImage field
 * 
 * @param {Object} featuredImage Gatsby featured image field
 * @returns {Object} Fluid image props
 */
export const getFluidPropsFromFeaturedImage = (featuredImage) => {
    try {
        return !_.isNull(featuredImage) && _.hasIn(featuredImage, 'asset')
            ? (_.hasIn(featuredImage, 'asset.fluid')
                ? featuredImage.asset.fluid
                : getFluidPropsFromId(featuredImage.asset._ref))
            : false

    } catch (err) {
        return err
    }
}
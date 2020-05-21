import _ from 'lodash'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

// Instantiate Sanity config objects
const config = { projectId: process.env.GATSBY_SANITY_PROJECT_ID, dataset: process.env.GATSBY_SANITY_DATASET, useCdn: true, }
const client = sanityClient(config)
const builder = imageURLBuilder(client)

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

        return getFluidGatsbyImage(imageAssetId, {}, config)

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

/**
 * Helper to return 
 * 
 * @param {String|Object} source Sanity image record, asset record or assetId string
 * @return {Object} Sanity image instance
 */
export const urlFor = (source) => builder.image(source)
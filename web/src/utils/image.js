import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const sanityConfig = {projectId: process.env.GATSBY_SANITY_PROJECT_ID, dataset: process.env.GATSBY_SANITY_DATASET,}

export const getFluidPropsFromId = (imageAssetId = '') => {
    try {
        if (imageAssetId.length < 1) {
            throw new Error('Image id needs to be a non-empty string')
        }

        return getFluidGatsbyImage(imageAssetId, {}, sanityConfig)

    } catch(err) {
        return err
    }
}
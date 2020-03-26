import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const sanityConfig = {projectId: 's1s9nwnc', dataset: 'development'}

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
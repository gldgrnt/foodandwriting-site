import React from "react"
import BlockContent from "@sanity/block-content-to-react"
import Proptypes from "prop-types"

import { FlexImagesType, LinkMark } from "./components"

/**
 * BlockContent component
 */
export const FawBlockContent = ({ content }) => {
    // Serializers
    const serializers = {
        types: {
            flexImages: FlexImagesType,
        },
        marks: {
            internalLink: LinkMark,
            externalLink: LinkMark,
        },
    }

    return <BlockContent blocks={content} serializers={serializers} />
}

/**
 * PropTypes
 */
FawBlockContent.propTypes = {
    content: Proptypes.array.isRequired,
}

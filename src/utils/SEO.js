import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import { urlFor } from '../utils'

/**
 * Function to create a function that replaces variables within a string
 *
 * @param {Array} replacementArray
 * @returns {Function} Curried string replacement function with variables preset
 */
const replaceVariables = replacementArray => {
    return str => {
        let newStr = str
        replacementArray.forEach(
            replacer =>
                (newStr = newStr.replace(replacer.value, replacer.replacement))
        )
        return newStr
    }
}

const setMetaDefault = (metaArr, defaultsArr) => {
    let newMetaArr = []
    defaultsArr.forEach(({ attr, attrValue, content }) => {
        // Check if meta prop already exists
        if (metaArr.filter(item => item[attr] === attrValue).length) {
            return
        }

        newMetaArr.push({ [attr]: attrValue, content })
    })

    // Add default items
    return [...metaArr, ...newMetaArr]
}

export const SEO = ({ description, lang, meta, title }) => {
    const { sanityConfig } = useStaticQuery(graphql`
        query {
            sanityConfig {
                siteDecsription
                siteTitle
                titleTemplate
                twitterHandle
                _rawSocialMediaImage
            }
        }
    `)

    // Create string replacement function
    const replaceSiteVariables = replaceVariables([
        { value: "%SITETITLE%", replacement: sanityConfig.siteTitle },
        { value: "%PAGETITLE%", replacement: "%s" },
    ])

    // Set up variables
    const titleTemplate = replaceSiteVariables(sanityConfig.titleTemplate)
    const metaDescription =
        description || replaceSiteVariables(sanityConfig.siteDecsription)

    // Setup meta
    const defaultMetaImage = urlFor(sanityConfig._rawSocialMediaImage).size(1200, 700).fit("min")
    const pageMeta = setMetaDefault(meta, [
        { attr: 'property', attrValue: "og:image", content: defaultMetaImage },
        { attr: 'name', attrValue: "twitter:image", content: defaultMetaImage },
    ])

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={titleTemplate}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:site`,
                    content: `@${sanityConfig.twitterHandle}`,
                },
                {
                    name: `twitter:creator`,
                    content: `@${sanityConfig.twitterHandle}`,
                },
            ].concat(pageMeta)}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}

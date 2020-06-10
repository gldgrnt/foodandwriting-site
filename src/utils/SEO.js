import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

/**
 * Function to create a function that replaces variables within a string
 * 
 * @param {Array} replacementArray 
 * @returns {Function} Curried string replacement function with variables preset 
 */
const replaceVariables = (replacementArray) => {
    return (str) => {
        let newStr = str
        replacementArray.forEach(replacer => newStr = newStr.replace(replacer.value, replacer.replacement))
        return newStr
    }
}

export const SEO = ({ description, lang, meta, title }) => {
    const { sanityConfig } = useStaticQuery(graphql`
        query {
            sanityConfig {
                siteDecsription
                siteTitle
                titleTemplate
                twitterHandle
            }
        }
    `)

    // Create string replacement function
    const replaceSiteVariables = replaceVariables([
        { value: '%SITETITLE%', replacement: sanityConfig.siteTitle },
        { value: '%PAGETITLE%', replacement: '%s' }
    ])

    // Set up variables
    const titleTemplate = replaceSiteVariables(sanityConfig.titleTemplate)
    const metaDescription = description || replaceSiteVariables(sanityConfig.siteDecsription)


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
                    content: `@${sanityConfig.twitterHandle}`
                },
                {
                    name: `twitter:creator`,
                    content: `@${sanityConfig.twitterHandle}`
                }
            ].concat(meta)}
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
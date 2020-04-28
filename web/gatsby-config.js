// In your gatsby-config.js file
require('dotenv').config()

const algoliaQueries = require("./src/utils/algolia")

module.exports = {
    siteMetadata: {
        title: `Food and Writing`,
        description: `Making food look pretty on a bathroom tile.`,
        author: 'wadada'
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `food-and-writing`,
                short_name: `faw`,
                start_url: `/`,
                background_color: `#111`,
                theme_color: `#111`,
                display: `minimal-ui`,
                icon: 'src/images/favicon.png'
            },
        },
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: process.env.GATSBY_SANITY_DATASET,
                useCdn: true,
            },
        },
        {
            resolve: 'gatsby-plugin-styled-components',
            options: {
                displayName: process.env.STYLED_COMPONENTS_DISPLAY_NAME
            }
        },
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              queries: algoliaQueries,
              chunkSize: 10000, // default: 1000
            },
        },
        {
            resolve: `gatsby-plugin-lodash`,
            options: {
                disabledFeatures: [`shorthands`, `cloning`],
            },
        },
    ],
}

// In your gatsby-config.js file
require('dotenv').config({
    path: `.env`
})

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
                // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 's1s9nwnc',
                dataset: 'development',
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
}

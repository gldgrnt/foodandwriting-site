/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Import stylesheet
require('./src/styles/external.css')


// Create a wrapping element that doesn't unmount when page changes
const React = require("react")
const MainContent = require("./src/components/layout").MainContent

exports.wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <MainContent {...props}>{element}</MainContent>
}


import React from "react"
import PropTypes from "prop-types"
import Header from '../header'
import Footer from '../footer'
import { Reset, Global, Theme } from '../../styles'

const Layout = ({ children }) => {
    return (
        <Theme>
            <Reset />
            <Global />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </Theme>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

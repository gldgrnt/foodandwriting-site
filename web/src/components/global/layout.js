import React from "react"
import PropTypes from "prop-types"

import { Header, Footer } from '../global'

const Layout = ({ children }) => {
    return (
        <>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

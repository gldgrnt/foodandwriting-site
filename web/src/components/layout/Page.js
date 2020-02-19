import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header'
import Footer from '../footer'
import { Reset, Global, Theme } from '../../styles'

export const Page = ({ children }) => {
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

Page.propTypes = {
    children: PropTypes.node.isRequired,
}
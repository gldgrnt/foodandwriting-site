import React from 'react'
import PropTypes from 'prop-types'

import Header from '../header'
import Footer from '../footer'
import { Reset, Global, Theme } from '../../styles'

/**
 * Page component
 */
export const Page = ({ children }) => {

    // Set custom viewheight variable
    if (typeof window !== "undefined") {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }

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

/**
 * PropTypes
 */
Page.propTypes = {
    children: PropTypes.node.isRequired,
}
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Header from '../header'
import Footer from '../footer'
import { Reset, Global, Theme } from '../../styles'
import { PageContext } from '../context'
import { useMobileStatus } from '../../hooks'

/**
 * Main content component - used to wrap content that is to be rerendered
*/
const MainContent = ({ children }) => <main>{children}</main>

/**
 * Page component
*/
export const Page = ({ children }) => {

    // Set custom viewheight variable
    if (typeof window !== "undefined") {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
        document.documentElement.style.setProperty('--vh-dynamic', `${window.innerHeight * 0.01}px`)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh-dynamic', `${window.innerHeight * 0.01}px`))
        }

        return () => {
            window.removeEventListener('resize', () => document.documentElement.style.setProperty('--vh-dynamic', `${window.innerHeight * 0.01}px`))
        }
    })

    // Set up page context
    const isMobile = useMobileStatus()
    const context = { isMobile }

    return (
        <Theme>
            <Reset />
            <Global />

            <PageContext.Provider value={context}>
                <Header />
                <MainContent>{children}</MainContent>
                <Footer />
            </PageContext.Provider>
        </Theme>
    )
}

/**
 * PropTypes
 */
Page.propTypes = {
    children: PropTypes.node.isRequired,
}
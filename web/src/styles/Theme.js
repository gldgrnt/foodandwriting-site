import React from 'react'
import { ThemeProvider } from 'styled-components'
import { PropTypes } from 'prop-types'

export const Theme = ({ children }) => (
    <ThemeProvider theme={variables}>{children}</ThemeProvider>
)

Theme.propTypes = {
    children: PropTypes.node.isRequired,
}

export const variables = {
    color: {
        white: '#FFFFFF',
        black: '#111111',
        whiteGrey: '#F6F6F6',
        lightGrey: '#AAAAAA',
        mediumGrey: '#777777',
        darkGrey: '#5A5A5A',
        yellow: '#FFD91F',
    },
    font: {
        family: {
            sans: 'europa, sans-serif',
            serif: 'garvis-pro, serif',
        },
        size: {
            tiny: '0.67rem',
            small: '0.8rem',
            regular: '1rem',
            increased: '1.125rem',
            medium: '1.5rem',
            large: '1.75rem',
            huge: '2em'
        }
    },
    transition: {
        fast: '0.3s ease',
    },
    grid: {
        columns: 8,
        spacing: 20,
        breakpoints: {
            monitor: {
                maxScreenWidth: 99999,
                minScreenWidth: 1600,
            },
            desktop: {
                maxScreenWidth: 1599.999,
                minScreenWidth: 1200,
            },
            laptop: {
                maxScreenWidth: 1199.999,
                minScreenWidth: 1000,
            },
            tablet: {
                maxScreenWidth: 999.999,
                minScreenWidth: 768,
            },
            mobile: {
                maxScreenWidth: 767.99,
                minScreenWidth: false,
            },
        }
    }
}
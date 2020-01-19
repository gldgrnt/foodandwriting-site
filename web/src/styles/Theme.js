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
            large: '2rem',
        }
    },
    transition: {
        fast: '0.3s ease',
    },
    grid: {
        columns: 8,
        spacing: 20,
        breakpoints: [
            1600,
            1300,
            1000,
            768,
            576
        ]
    }
}
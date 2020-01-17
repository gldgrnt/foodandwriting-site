import React from 'react'
import { ThemeProvider } from 'styled-components'
import { PropTypes } from 'prop-types'

export const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

Theme.propTypes = {
    children: PropTypes.node.isRequired,
}

const theme = {
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
        size: {
            small: '13px',
        }
    },
    transition: {
        fast: '0.3s ease',
    },
    breakpoints: {
        xl: 1600,
        lg: 1200,
        md: 991,
        sm: 768,
        xs: 576,
    }
}
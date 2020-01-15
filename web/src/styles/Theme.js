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
    colors: {
        black: '#111'
    }
}
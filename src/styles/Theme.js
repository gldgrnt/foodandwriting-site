import React from "react"
import { ThemeProvider } from "styled-components"
import { PropTypes } from "prop-types"

export const Theme = ({ children }) => (
    <ThemeProvider theme={themeVariables}>{children}</ThemeProvider>
)

Theme.propTypes = {
    children: PropTypes.node.isRequired,
}

export const themeVariables = {
    color: {
        white: "#FFFFFF",
        black: "#111111",
        whiteGrey: "#F6F6F6",
        lightGrey: "#AAAAAA",
        mediumGrey: "#666666",
        darkGrey: "#5A5A5A",
        yellow: "#FFD91F",
        blackOverlay: "rgba(37, 37, 37, 0.75)",
        lightGreyOverlay: "rgba(170, 170, 170, 0.25)",
    },
    font: {
        family: {
            sans: "europa, sans-serif",
            serif: "garvis-pro, serif",
        },
        size: {
            tiny: "0.67rem",
            small: "0.8rem",
            regular: "1rem",
            increased: "1.125rem",
            medium: "1.35rem",
            large: "1.5rem",
            huge: "1.67rem",
            giant: "2rem",
        },
        lineHeight: {
            header: "1.6",
            paragraph: "1.9",
        },
    },
    transition: {
        fast: "0.3s ease",
        medium: "0.6s ease",
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
                maxScreenWidth: 1599,
                minScreenWidth: 1200,
            },
            laptop: {
                maxScreenWidth: 1199,
                minScreenWidth: 1000,
            },
            tablet: {
                maxScreenWidth: 999,
                minScreenWidth: 768,
            },
            mobile: {
                maxScreenWidth: 767,
                minScreenWidth: false,
            },
        },
    },
}

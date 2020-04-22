import { useState, useEffect, useCallback } from 'react'

import { themeVariables } from '../styles'

/**
 * useMobileStatus hook
 * 
 * @returns Boolean for width of browser window
 */
export const useMobileStatus = () => {
    // Create function to get the status of the window width
    // useCallback so that a single function is used as this hook rerenders
    const getMobileStatus = useCallback(() => {
        return window !== "undefined" ? window.innerWidth <= themeVariables.grid.breakpoints.mobile.maxScreenWidth : false
    }, [])

    // Create initial state based on the initial mobile status
    const [ status, setStatus ] = useState(getMobileStatus())

    // Event handler for window resize
    // useCallback so that a single function is used as this hook rerenders
    const handleResize = useCallback(() => {
        return setStatus(getMobileStatus())
    }, [getMobileStatus, setStatus])

    // Add window resize event listener and remove on clean up
    useEffect( () => {
        if (window !== "undefined") {
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [handleResize])

    // Return the status of whether the window is small enough to be a mobile device
    return status
}
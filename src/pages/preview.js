import React, { useEffect } from "react"
import { Router } from "@reach/router"
import { Preview } from "../components/preview"

const PreviewPage = () => {
    // Redirect if accessed incorrectly
    useEffect(() => {
        if (typeof window !== undefined && window.location.pathname !== '/preview/' && window.location.pathname !== '/preview') {
            window.location.pathname = '/'
        }
    }, [])

    return (
        <>
            <Router basepath="/preview">
                <Preview path="/" />
            </Router>
        </>
    )
}

export default PreviewPage

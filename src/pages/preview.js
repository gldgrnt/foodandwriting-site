import React from "react"
import { Router } from "@reach/router"
import { Preview } from "../components/preview"

const PreviewPage = () => {
    // Redirect if accessed incorrectly
    if (window !== undefined && window.location.pathname !== '/preview/') {
        window.location.pathname = '/'
    }

    return (
        <>
            <Router basepath="/preview">
                <Preview path="/" />
            </Router>
        </>
    )
}

export default PreviewPage

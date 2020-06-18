import React from 'react'
import { Router } from '@reach/router'
import { Preview } from '../components/preview'

const PreviewPage = () => {
    return (
        <>
            <Router basepath="/preview">
                <Preview path="/" />
            </Router>
        </>
    )
}

export default PreviewPage
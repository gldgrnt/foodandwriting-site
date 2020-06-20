import React, { useEffect, useState } from 'react'
import sanityClient from '@sanity/client'

import { transformContact, transformAbout, transformPost, postProjection, transformCookies } from '../../utils/preview'
import AboutPage from '../../pages/about'
import ContactPage from '../../pages/contact'
import CookiesPage from '../../pages/cookies'
import PostTemplate from '../../page-templates/post'
import { NetlifyLogin } from './NetlifyLogin'

// Instantiate sanity client
const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET,
    token: process.env.GATSBY_SANITY_READ_TOKEN,
    useCdn: false
})

// Func to get required query and component per _type
const getPreview = (_type) => {
    const defaultQuery = '*[ _id == $_id && _type == $_type]'

    switch (_type) {
        case 'contact':
            return {
                query: defaultQuery,
                Component: ContactPage,
                transformer: transformContact
            }

        case 'about':
            return {
                query: defaultQuery,
                Component: AboutPage,
                transformer: transformAbout
            }

        case 'post':
            return {
                query: defaultQuery + postProjection,
                Component: PostTemplate,
                transformer: transformPost
            }

        case 'cookies':
            return {
                query: defaultQuery,
                Component: CookiesPage,
                transformer: transformCookies
            }

        default:
            return
    }
}

// Fetch document from Sanity
const getDocument = async (query, params) => {
    try {
        return client.fetch(query, params)
    } catch {
        return false
    }
}

/**
 * Component
 */
export const Preview = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                if (typeof window === undefined || !loggedIn) {
                    return
                }

                // Set up fetch query and params 
                const urlParams = new URLSearchParams(window.location.search)
                const params = { _id: urlParams.get('_id'), _type: urlParams.get('_type') }
                const { query, Component, transformer } = getPreview(params._type)

                // Fetch data from Sanity
                const [data] = await getDocument(query, params)

                // Redirect if empty
                if (!data) {
                    return window.location.href = "/"
                }

                // Set the state
                setState({ data: transformer(data), Component })
            } catch (err) {
                return console.log(err)
            }
        })()
    }, [loggedIn])

    if (!loggedIn) {
        return <NetlifyLogin setLoggedIn={() => setLoggedIn(true)} />
    }

    if (state === null) {
        return <div></div>
    }

    // Deconstruct the state
    const { data, Component } = state

    return <Component data={data} />
}
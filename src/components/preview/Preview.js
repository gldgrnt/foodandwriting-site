import React, { useEffect, useState } from 'react'
import sanityClient from '@sanity/client'

import { transformContact, transformAbout } from '../../utils/preview'
import AboutPage from '../../pages/about'
import ContactPage from '../../pages/contact'

const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET,
    token: process.env.GATSBY_SANITY_READ_TOKEN, // or leave blank to be anonymous user
    useCdn: false
})

const getDocument = async (_id, _type) => {
    try {
        const query = '*[ _id == $_id && _type == $_type]'
        const params = { _id, _type }
        return client.fetch(query, params)
    } catch {
        return false
    }
}

export const Preview = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                if (typeof window === undefined) {
                    return
                }

                const urlParams = new URLSearchParams(window.location.search)
                const _id = urlParams.get('_id')
                const _type = urlParams.get('_type')

                const results = await getDocument(_id, _type)
                const previewDocument = results[0]

                if (!previewDocument) {
                    return window.location.href = "/"
                }

                setState({ _type, document: previewDocument })
            } catch (err) {
                return console.log(err)
            }
        })()
    }, [])

    if (!state) {
        return <div></div>
    }

    switch (state._type) {
        case 'contact':
            return <ContactPage data={transformContact(state.document)} />

        case 'about':
            return <AboutPage data={transformAbout(state.document)} />

        default:
            return <div></div>
    }
}
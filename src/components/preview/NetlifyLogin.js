import React, { useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

export const NetlifyLogin = ({ setLoggedIn }) => {


    useEffect(() => {
        netlifyIdentity.init({
            APIUrl: process.env.GATSBY_NETLIFY_IDENTITY_ENDPOINT
        })

        netlifyIdentity.on('login', setLoggedIn)

        if (!netlifyIdentity.currentUser()) {
            return netlifyIdentity.open()
        }

        setLoggedIn()
    }, [setLoggedIn])

    return <div></div>
}
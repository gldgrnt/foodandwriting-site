import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
const sanityClient = require('@sanity/client')

export const useSearch = (query) => {
    const [state, setState] = useState({ results: [], loading: false });

    useEffect(() => {
        // Cancel if search term is empty
        if (!query) {
            return;
        }

        // Set up sanity client
        const client = sanityClient({
            projectId: 's1s9nwnc',
            dataset: 'production',
            useCdn: true
        })

        // Set state to loading
        setState(oldState => ({ results: oldState.results, loading: true }));

        // Make request
        client.fetch(`*[_type == "${query}"]`)
            .then(res => {
                console.log(res);
                setState({ results: res, loading: false })
            })

    }, [query, setState])

    return state
}
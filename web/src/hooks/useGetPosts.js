import { useState, useEffect } from 'react'
import axios from 'axios'

export const useGetPosts = ({ categoryId, amount, offset }) => {
    const [state, setState] = useState({ results: [], loading: false });

    useEffect(() => {

        // Cancel if search term is empty
        if (!categoryId || !amount || !offset ) return () => {return};

        // Set state to loading
        setState(oldState => ({ ...oldState, loading: true }));

        // Make to netlify serverless function
        axios.get(`/.netlify/functions/get-posts?categoryId=${categoryId}&amount=${amount}&offset=${offset}`)
            .then(response => setState({results: response.data.posts, loading: false}))

    }, [categoryId, amount, offset, state, setState])

    return state
}
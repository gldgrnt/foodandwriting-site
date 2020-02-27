import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const SearchBarResults = ({ loading, results }) => {

    return (
        <ResultsWrapper>
            {!loading && results.map(result => (
                <p key={result._id}>{result.title || result._id}</p>
            ))}
        </ResultsWrapper>
    )
}

SearchBarResults.propTypes = {
    loading: PropTypes.bool.isRequired,
    results: PropTypes.array
}

const ResultsWrapper = styled.div`
    width: 100;
    
    & > * {
        padding: 40px 0;
        margin: 0;
    }
`
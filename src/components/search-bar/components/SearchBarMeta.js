import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectStateResults } from 'react-instantsearch-dom'

import { SmallCaps } from '../../ui'

/**
 * SearchBarMeta
 */
const CustomSearchBarMeta = ({ hits, searchResults }) => {

    let showingString = ''
    let resultsString = ''

    if (searchResults) {
        const {query, nbHits } = searchResults

        // Create showing string
        showingString = (query.trim() !== "" && nbHits > 0) ? `Showing ${hits.length} of ` : ''

        // Create results string
        resultsString = query.trim() !== "" ? `${nbHits} ${nbHits === 1 ? 'result' : 'results'} for "${query}"` : 'Recent posts' 
    }

    return (
        <SearchBarMetaWrapper>
            <SmallCaps>{showingString + resultsString}</SmallCaps>
        </SearchBarMetaWrapper>
    )
}

export const SearchBarMeta = connectStateResults(CustomSearchBarMeta)

/**
 * PropTypes
 */
SearchBarMeta.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchResults: PropTypes.object
}

/**
 * Styles
 */
const SearchBarMetaWrapper = styled.div`
    display: flex;
    padding-bottom: 20px;

    > span {
        font-size: ${props => props.theme.font.size.small};
    }
`
import React from "react"
import { InstantSearch, Configure, connectInfiniteHits } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import PropTypes from 'prop-types'

import { SearchBarInput, SearchBarHits, SearchBarMeta, SearchBarFooter } from './components'

/**
 * searchBarContainer component 
 */
export const SearchBarContainer = ({ closeDropdown }) => {
    // Initialise variables
    const searchClient = algoliasearch( process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY )
    const algoliaIndexName = process.env.GATSBY_ALGOLIA_INDEX_NAME
    
    // Create custom infinite hits component   
    const SearchBarResults = connectInfiniteHits( ({ refineNext, hasMore, hits }) => (
        <>
            <SearchBarMeta hits={hits}/>
            <SearchBarHits hits={hits} loadMore={refineNext} hasMore={hasMore} />
            <SearchBarFooter closeDropdown={closeDropdown} />
        </>
    ))

    return (
        <InstantSearch indexName={algoliaIndexName} searchClient={searchClient}>
            <Configure hitsPerPage={6} />
            <SearchBarInput closeDropdown={closeDropdown} />
            <SearchBarResults />
        </InstantSearch>
    )
}

/**
 * PropTypes
 */
SearchBarContainer.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}
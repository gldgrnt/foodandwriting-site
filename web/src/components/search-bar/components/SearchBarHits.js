import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image/withIEPolyfill'
import { Highlight, connectStateResults } from 'react-instantsearch-dom'

import { getPostDate, responsiveBreakpointDown } from '../../../utils'
import { InternalLink, SmallCaps, Button } from '../../ui'

/**
 * SearchBarHits component
 */
const CustomInfiniteHits = ({ hits, searchResults, loadMore, hasMore }) => {

    let searchHits = []
    let expand = false
    let searchQuery = ""

    if (searchResults) {
        const { query, page, hitsPerPage } = searchResults

        // Set hits
        if (hits.length) searchHits = hits

        // Change visible posts to 2 for empty query (showing recent posts)
        if (query.trim() === "" && page === 0) searchHits = hits.slice(0,2)

        // Set HitsWrapper expansion
        if (searchHits > hitsPerPage) expand = true

        // Set query
        searchQuery = query
    }

    const showButton = searchQuery && hasMore

    return (
        <HitsWrapper>
            <HitsList expand={expand}>
                {searchHits.length > 0 ? searchHits.map( hit => {

                    // Destructure variables
                    const { fullSlug, date, featuredImage, categoryName, categoryType } = hit
                    const postDate = getPostDate(date)

                    // Get the matched ingredients
                    if (categoryType === 'Recipe') {
                        hit["_highlightResult"]["shoppingList"] = hit._highlightResult.shoppingList.filter( item => item.matchedWords.length > 0)
                    }

                    return (<Hit key={hit._id}>
                        <InternalLink to={fullSlug}>
                            <ImageWrapper>
                                {featuredImage !== null ? <Img fluid={featuredImage.asset.fluid} /> : <div></div>}
                            </ImageWrapper>
            
                            <CaptionWrapper>
                                <Title><Highlight hit={hit} attribute="title"/></Title>
            
                                <MetaWrapper>
                                    { categoryName && <SmallCaps>{categoryName}</SmallCaps> }
                                    { date && <SmallCaps as="time" datetime={postDate.raw}>{postDate.formatted}</SmallCaps> }
                                </MetaWrapper>
            
                                { (Array.isArray(hit._highlightResult.shoppingList) && hit._highlightResult.shoppingList.length > 0) && 
                                    <MatchedIngredients> Contains: <Highlight hit={hit} attribute="shoppingList"/></MatchedIngredients>
                                }
                            </CaptionWrapper>
                        </InternalLink>
                    </Hit>
                )}) : <span></span>}
            </HitsList>

            {showButton && <Button primary onClick={loadMore}>View more results</Button>}
        </HitsWrapper>
    )
}

export const SearchBarHits = connectStateResults(CustomInfiniteHits)

/**
 * PropTypes
 */
CustomInfiniteHits.propTypes = {
    searchResults: PropTypes.shape({
        query: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
        hitsPerPage: PropTypes.number.isRequired,
    }),
    hits: PropTypes.arrayOf(PropTypes.shape({
        hit: PropTypes.shape({ 
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            fullSlug: PropTypes.string.isRequired,
            categoryName: PropTypes.string.isRequired,
            categoryType: PropTypes.string.isRequired,
            featuredImage: PropTypes.shape({
                asset: PropTypes.shape({
                    fixed: PropTypes.object
                })
            }),
            shoppingList: PropTypes.arrayOf(PropTypes.string)
        })
    })),
    loadMore: PropTypes.func,
    hasMore: PropTypes.bool
}

/**
 * Styles
 */
const HitsWrapper = styled.div`
    flex-grow: 1;
    overflow: auto;
`

const HitsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
    list-style-type: none;
`

const Hit = styled.li`
    min-height: 150px;
    width: calc(50% - 20px);
    margin: 0 0 20px;
    background: white;

    ${responsiveBreakpointDown('laptop', `flex-basis: 100%;`)}

    > a {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    }
`

const ImageWrapper = styled.div`
    display: inline-flex;
    height: 100%;
    background: ${props => props.theme.color.lightGreyOverlay};

    > * {
        width: 150px;

        ${responsiveBreakpointDown('laptop', `width: 100px;`)}
    }
`

const CaptionWrapper = styled.div`
    flex-grow: 1;
    padding: 0 40px;

    ${responsiveBreakpointDown('desktop', `padding: 0 25px;`)}
    ${responsiveBreakpointDown('laptop', `padding: 25px;`)}

    em {
        font-style: normal;
        background-color: ${props => props.theme.color.yellow};
    }

    > {
        div > *,
        p {
            font-size: ${props => props.theme.font.size.small};

            ${responsiveBreakpointDown('desktop', `font-size: ${props => props.theme.font.size.tiny};`)}
        }
    }
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.increased};
    margin-bottom: 15px;

    ${responsiveBreakpointDown('desktop', `
        font-size: ${props => props.theme.font.size.regular};
    `)}
`

const MetaWrapper = styled.div`
    display: flex;
    align-items: center;

    > * {
        &:not(:first-child) {
            position: relative;
            margin-left: 10px;

            &::before {
                content: ' · ';
                position: absolute;
                left: -6px; 
            }
        }
    }
`

const MatchedIngredients = styled.p`
    color: ${props => props.theme.color.darkGrey};
    margin-top: 10px;

    > span:not(:last-of-type) {
        &::after {
            content: ','
        }
    }
`
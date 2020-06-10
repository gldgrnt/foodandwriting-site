import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PostArchive } from '../components/page-sections'
import { Page, Section, GridContainer, GridRow, GridCol } from '../components/layout'
import { SmallCaps, InternalLink } from '../components/ui'
import { SEO } from '../utils'

const FourOhFourPage = ({ data: { recentRecipes, recipesCategory } }) => (
    <Page>
        <SEO title="Page not found" />
        <Section spacingTop="2" spacingBottom="3" >
            <GridContainer>
                <GridRow>
                    <GridCol>
                        <h1>Page not found</h1>
                        <p>There were no results for that page.</p>
                        <InternalLink primary to="/">Back home</InternalLink>
                    </GridCol>
                </GridRow>
            </GridContainer>
        </Section>

        <Section spacingBottom="4">
            <RecentRecipesWrapper>
                <GridContainer justify="flex-start" align="center">
                    <SmallCaps as="h2" color="black">Recent recipes</SmallCaps>
                </GridContainer>
                <PostArchive posts={recentRecipes.nodes} categoryType="Recipe" />
                <GridContainer justify="flex-start" align="center">
                    <InternalLink secondary to={`/${recipesCategory.slug.current}`}>View all recipes</InternalLink>
                </GridContainer>
            </RecentRecipesWrapper>
        </Section>
    </Page >
)

export default FourOhFourPage

/**
 * PropTypes
 */
FourOhFourPage.propTypes = {
    data: PropTypes.shape({
        recentRecipes: PropTypes.shape({
            nodes: PropTypes.array.isRequired
        }).isRequired,
        recipesCategory: PropTypes.shape({
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired
}


/**
 * Styles
 */
const RecentRecipesWrapper = styled.div`
    > div > h2 {
        margin: 0;
    }

    > *:not(:last-child) {
        margin-bottom: 40px;
    }
`

/**
 * GraphQL query
 */
export const query = graphql`
   query FourOhFourPageQuery {
        recentRecipes:  allSanityPost(limit: 3, sort: {order: DESC, fields: date}, filter: {category: {categoryType: {eq: "Recipe"}}}) {
            nodes {
                ...PreviewPostFragment
                ...MediumFluidImageFragment
            }
        }
        recipesCategory: sanityCategory(categoryType: {eq: "Recipe"}) {
            slug {
                current
            }
        }
    } 
`
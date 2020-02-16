import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { SEO } from '../utils'
import { PostHero } from '../components/post-sections'
import { Page, Section, GridContainer, GridRow, GridCol } from '../components/layout'
import { SmallCaps, Divider } from '../components/ui'

export default ({ data }) => {

    const { title, postMeta, featuredImage, recipeInfo, recipeIntro, seoDescription, shoppingList, steps, recipeNotes } = data.post

    return (
        <>
            <SEO title={`${title} recipe`} description={seoDescription || recipeIntro} />
            <Page>
                <Section spacingBottom="5">
                    <PostHero featuredImage={featuredImage} subtitle={postMeta.category.categoryOptions.singleName} title={title} />
                </Section>

                <Section spacingBottom="5">
                    <RecipeWrapper>
                        <GridContainer wrap="wrap">
                            <GridRow justify="center">
                                <GridCol cols="2">
                                    <SmallCaps size="regular" color="darkGrey">This recipe</SmallCaps>
                                    <UnstyledList>
                                        {recipeInfo.serves && <li>Serves: {recipeInfo.serves}</li>}
                                        {recipeInfo.difficulty && <li>Difficulty: {recipeInfo.difficulty}</li>}
                                        {recipeInfo.readyIn && <li>Ready in: {recipeInfo.readyIn}</li>}
                                    </UnstyledList>
                                </GridCol>

                                <GridCol cols={{'monitor': 4, 'desktop': 5}}>
                                    <Intro>{recipeIntro}</Intro>
                                </GridCol>
                            </GridRow>

                            <GridRow justify="center">
                                <GridCol cols={{'monitor': 6, 'desktop': 7}}>
                                    <Divider />
                                </GridCol>
                            </GridRow>

                            <GridRow justify="center">
                                <GridCol cols="2">
                                    <SmallCaps size="regular" color="darkGrey">Shopping list</SmallCaps>
                                    <UnstyledList>
                                        {shoppingList.map(listItem => {
                                            let { amount, itemSearch } = listItem

                                            return <li key={itemSearch + amount}>{`${itemSearch}, ${amount}`}</li>
                                        })}
                                    </UnstyledList>
                                </GridCol>

                                <GridCol cols={{'monitor': 4, 'desktop': 5}}>
                                    <SmallCaps size="regular" color="darkGrey">Method</SmallCaps>
                                    <UnstyledList>
                                        {steps.map((step, index) => (
                                            <RecipeStep key={step}>
                                                <span>{`${index + 1}.`}</span>
                                                <p>{step}</p>
                                            </RecipeStep>
                                        ))}
                                    </UnstyledList>
                                    {recipeNotes && <Notes>Notes: {recipeNotes}</Notes>}
                                </GridCol>
                            </GridRow>
                        </GridContainer>
                    </RecipeWrapper>
                </Section>
            </Page>
        </>
    )
}

const RecipeWrapper = styled.div`
    font-size: ${props => props.theme.font.size.increased};
`

const UnstyledList = styled.ul`
    margin-top: 20px;
    list-style-type: none;
    margin-left: 0;
`

const Intro = styled.p`
    margin-top: -3px; /* Line up with the small caps title */

    > *:last-child {
        margin-bottom: 0;
    }
`

const RecipeStep = styled.li`
    display: flex;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
    
    span {
        display: inline-block;
        min-width: 30px;
    }
`

const Notes = styled.p`
    color: ${props => props.theme.color.darkGrey};
    font-style: italic;
    margin-top: 40px;
`

// Graphql query

export const query = graphql`
    query ($id: String) {
        post: sanityRecipe(id: {eq: $id}) {
            title
            steps
            shoppingList {
                amount
                itemSearch
                _key
            }
            recipeNotes
            recipeIntro
            recipeInfo {
                difficulty
                readyIn
                serves
            }
            postMeta {
                category {
                ... on SanityRecipeCategory {
                    id
                    slug {
                    current
                    }
                    categoryOptions {
                    singleName
                    }
                }
                }
                date
                seoDescription
            }
            featuredImage {
                asset {
                    fluid {
                    ...GatsbySanityImageFluid_noBase64
                    }
                }  
            }
        }
    }
`
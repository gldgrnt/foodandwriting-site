import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { SEO, responsiveBreakpointDown } from '../utils'
import { PostHero } from '../components/post-sections'
import { Page, Section, GridContainer, GridRow, GridCol } from '../components/layout'
import { SmallCaps, Divider } from '../components/ui'

export default ({ data }) => {

    const { title, postMeta, featuredImage, recipeInfo, recipeIntro, seoDescription, shoppingList, steps, recipeNotes } = data.post

    return (
        <>
            <SEO title={`${title} recipe`} description={seoDescription || recipeIntro} />
            <Page>
                <Section>
                    <PostHero featuredImage={featuredImage} subtitle={postMeta.category.categoryOptions.singleName} title={title} />
                </Section>

                <Section spacingTop={{'monitor': 5, 'laptop': 4, 'tablet': 3}} spacingBottom={{'monitor': 5, 'laptop': 4, 'tablet': 3}}>
                    <RecipeWrapper>
                        <GridContainer wrap="wrap">
                            <GridRow justify="center">
                                <GridCol cols={{'monitor': 2, 'tablet': 8}}>
                                    <SmallCaps size="regular" color="darkGrey">This recipe</SmallCaps>
                                    <UnstyledList responsive>
                                        {recipeInfo.serves && <li>Serves: {recipeInfo.serves}</li>}
                                        {recipeInfo.difficulty && <li>Difficulty: {recipeInfo.difficulty}</li>}
                                        {recipeInfo.readyIn && <li>Ready in: {recipeInfo.readyIn}</li>}
                                    </UnstyledList>
                                </GridCol>

                                <GridCol cols={{'monitor': 4, 'desktop': 5, 'tablet': 8}}>
                                    <Section as="div" spacingBottom={{'monitor': 0, tablet: 1}}>
                                        <Intro>{recipeIntro}</Intro>
                                    </Section>
                                </GridCol>
                            </GridRow>

                            <GridRow justify="center">
                                <GridCol cols={{'monitor': 6, 'desktop': 7, 'tablet': 8}}>
                                    <Divider />
                                </GridCol>
                            </GridRow>

                            <GridRow justify="center">
                                <GridCol cols={{'monitor': 2, 'tablet': 8}}>
                                    <Section as="div" spacingTop={{'monitor': 0, tablet: 1}} spacingBottom={{'monitor': 0, tablet: 1}}>
                                        <SmallCaps size="regular" color="darkGrey">Shopping list</SmallCaps>
                                        <UnstyledList responsive>
                                            {shoppingList.map(listItem => {
                                                let { amount, itemSearch } = listItem
                                                return <li key={itemSearch + amount}>{`${itemSearch}, ${amount}`}</li>
                                            })}
                                        </UnstyledList>
                                    </Section>
                                </GridCol>

                                <GridCol cols={{'monitor': 4, 'desktop': 5, 'tablet': 8}}>
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

    ${props => props.responsive && responsiveBreakpointDown('tablet', `
        display: flex;
        flex-wrap: wrap;

        > li {
            flex-basis: 50%;

        }
    `)}

    ${responsiveBreakpointDown('mobile', `
        > li {
            flex-basis: 100%;
        }
    `)}
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
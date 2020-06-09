import React from 'react'
import styled from 'styled-components'

import { FawBlockContent } from '../block-content'
import { responsiveBreakpointDown, parseReadyInString } from '../../utils'
import { Section, GridContainer, GridRow, GridCol } from '../layout'
import { SmallCaps, Divider } from '../ui'

/**
 * RecipePostContent component
 */
export const RecipePostContent = ({ content: { readyIn, recipeIntro, recipeNotes, serves, shoppingList, steps } }) => {

    const humanReadyIn = parseReadyInString(readyIn)

    const recipeMeta = !recipeIntro
        ? <Section as="div" spacingBottom="2">
            <SmallCaps size="regular" color="darkGrey">This recipe</SmallCaps>
            <UnstyledList responsive>
                {serves && <li>Serves: {serves}</li>}
                {readyIn && <li>Ready in: {humanReadyIn}</li>}
            </UnstyledList>
        </Section>
        : <>
            <SmallCaps size="regular" color="darkGrey">This recipe</SmallCaps>
            <UnstyledList responsive>
                {serves && <li>Serves: {serves}</li>}
                {readyIn && <li>Ready in: {humanReadyIn}</li>}
            </UnstyledList>
        </>

    return (
        <RecipeWrapper>
            <GridContainer wrap="wrap">
                {recipeIntro && // Only render the top section if there is a recipe intro
                    <>
                        <GridRow justify="center">
                            <GridCol cols={{ 'monitor': 2, 'tablet': 8 }}>
                                {recipeMeta}
                            </GridCol>

                            <GridCol cols={{ 'monitor': 4, 'desktop': 5, 'tablet': 8 }}>
                                <Section as="div" spacingBottom={{ 'monitor': 0, tablet: 1 }}>
                                    <Intro><FawBlockContent content={recipeIntro} /></Intro>
                                </Section>
                            </GridCol>
                        </GridRow>

                        <GridRow justify="center">
                            <GridCol cols={{ 'monitor': 6, 'desktop': 7, 'tablet': 8 }}>
                                <Divider />
                            </GridCol>
                        </GridRow>
                    </>
                }

                <GridRow justify="center">
                    <GridCol cols={{ 'monitor': 2, 'tablet': 8 }}>
                        {!recipeIntro && recipeMeta}

                        <Section as="div" spacingTop={{ 'monitor': 0, tablet: 1 }} spacingBottom={{ 'monitor': 0, tablet: 1 }}>
                            <SmallCaps size="regular" color="darkGrey">Shopping list</SmallCaps>
                            <UnstyledList responsive>
                                {shoppingList.map(listItem => {
                                    let { amount, ingredient, _key } = listItem
                                    return <li key={_key}>{`${ingredient}, ${amount}`}</li>
                                })}
                            </UnstyledList>
                        </Section>
                    </GridCol>

                    <GridCol cols={{ 'monitor': 4, 'desktop': 5, 'tablet': 8 }}>
                        <SmallCaps size="regular" color="darkGrey">Method</SmallCaps>
                        <UnstyledList>
                            <FawBlockContent content={steps} />
                        </UnstyledList>
                        {recipeNotes &&
                            <Notes>
                                <SmallCaps size="regular" color="darkGrey">Notes</SmallCaps>
                                <FawBlockContent content={recipeNotes} />
                            </Notes>
                        }
                    </GridCol>
                </GridRow>

                <GridRow justify="center">
                    <GridCol cols={{ 'monitor': 6, 'desktop': 7, 'tablet': 8 }}>
                        <Divider />
                    </GridCol>
                </GridRow>
            </GridContainer>
        </RecipeWrapper>
    )
}

/**
 * PropTypes
 */



/**
 * Styles
 */
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

const Intro = styled.div`
    margin-top: -3px; /* Line up with the small caps title */
    > *:last-child {
        margin-bottom: 0;
    }
`

const Notes = styled.div`
    margin-top: 40px;

    *:first-child {
        margin-bottom: 20px;
    }

    p {
        color: ${props => props.theme.color.darkGrey};
        font-style: italic;
    }        
`
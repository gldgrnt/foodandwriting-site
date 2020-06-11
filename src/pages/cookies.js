import React from 'react'
import styled from 'styled-components'

import { SEO } from '../utils'
import { Page, Section, GridContainer } from '../components/layout'

/**
 * CookiesPage component
 */
const CookiesPage = () => {

    return (
        <>
            <SEO title="Cookies" />
            <Page>
                <Section spacingTop="2" spacingBottom="3">
                    <GridContainer>
                        <Title>This is the title for the Cookies page</Title>
                    </GridContainer>
                </Section>

                <GridContainer>
                    <p>Cookie page content</p>
                </GridContainer>
            </Page>
        </>
    )
}

export default CookiesPage

const Title = styled.h1`
    margin: 0;
`
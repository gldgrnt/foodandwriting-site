import React from 'react'
import styled from 'styled-components'
// import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'

import { SEO } from '../utils'
import { Page, Section, GridContainer } from '../components/layout'
// import { FawBlockContent } from '../components/block-content'

/**
 * ContactPage component
 */
const ContactPage = () => {

    return (
        <>
            <SEO title="Contact" />
            <Page>
                <Section spacingTop="2" spacingBottom="3">
                    <GridContainer>
                        <Title>Contact</Title>
                    </GridContainer>
                </Section>

                <GridContainer>
                    <p>Contact page content</p>
                </GridContainer>
            </Page>
        </>
    )
}

export default ContactPage

const Title = styled.h1`
    margin: 0;
`

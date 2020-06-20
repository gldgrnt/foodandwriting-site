import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
// import PropTypes from 'prop-types'

import { SEO } from '../utils'
import { Page, Section, GridContainer } from '../components/layout'
import { FawBlockContent } from '../components/block-content'

/**
 * ContactPage component
 */
const ContactPage = ({ data: { sanityContact: { _rawContent } } }) => {

    return (
        <>
            <SEO title="Contact" />
            <Page>
                <Section spacingTop="2" spacingBottom="3">
                    <GridContainer justify="center">
                        <Content>
                            <h1>Contact</h1>
                            <FawBlockContent content={_rawContent} />
                        </Content>
                    </GridContainer>
                </Section>
            </Page>
        </>
    )
}

export default () => (
    <StaticQuery query={
        graphql`
            query ContactPageQuery {
                sanityContact {
                    _rawContent(resolveReferences: {maxDepth: 10})
                }
            }
        `
    }
        render={data => <ContactPage data={data} />}
    />
)

const Content = styled.div`
    width: 100%;
    max-width: 750px;
`
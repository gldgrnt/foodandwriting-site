import React from 'react'
import styled from 'styled-components'

import { SEO, responsiveBreakpointDown } from '../utils'
import { FawBlockContent } from '../components/block-content'
import { Page, Section, GridContainer } from '../components/layout'

/**
 * CookiesPage component
 */
const CookiesPage = ({ data: { sanityCookies: { _rawContent, cookies } } }) => {

    return (
        <>
            <SEO title="Cookies" />
            <Page>
                <Section spacingTop="2" spacingBottom="3">
                    <GridContainer justify="center">
                        <Content>
                            <h1>Cookies</h1>
                            <FawBlockContent content={_rawContent} />
                            <TableWrapper>
                                <table>
                                    <thead>
                                        <TableRow>
                                            <th>Cookie</th>
                                            <th>Name</th>
                                            <th>Purpose</th>
                                        </TableRow>
                                    </thead>
                                    <tbody>
                                        {cookies.map(({ type, name, purpose }) => (
                                            <TableRow key={name}>
                                                <td>{type}</td>
                                                <td>{name}</td>
                                                <td>{purpose}</td>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </table>
                            </TableWrapper>
                        </Content>
                    </GridContainer>
                </Section>
            </Page>
        </>
    )
}

export default CookiesPage

/**
 * Styles
 */

const Content = styled.div`
    width: 100%;
    max-width: 750px;
`

const TableWrapper = styled.div`
    padding-top: 15px;
    max-width: 100%;

    ${responsiveBreakpointDown('mobile', `
        overflow: scroll;
    
        table {
            min-width: 500px;
        }
    `)}
`

const TableRow = styled.tr`
    td, th {
        line-height: 1.7;

        &:not(:last-child) {
            width: 25%;
        }
    }

    td {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
`

/**
 * GraphQL query
 */
export const query = graphql`
   query CookiesPageQuery {
        sanityCookies {
            _rawContent(resolveReferences: {maxDepth: 10})
            cookies {
                name
                purpose
                type
                _key
            }
        }
    }
`
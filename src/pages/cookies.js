import React from 'react'
import styled from 'styled-components'

import { SEO, responsiveBreakpointDown } from '../utils'
import { Page, Section, GridContainer } from '../components/layout'

const cookieInfo = [
    {
        type: 'Necessary',
        name: '_faw',
        purpose: 'Used to determine if the visitor has dismissed the cookie banner already.'
    },
    {
        type: 'Analytical',
        name: '_ga',
        purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.'
    },
    {
        type: 'Analytical',
        name: '_gat',
        purpose: 'Used by Google Analytics to throttle request rate.'
    },
    {
        type: 'Analytical',
        name: '_gid',
        purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.'
    },
]

/**
 * CookiesPage component
 */
const CookiesPage = () => {

    return (
        <>
            <SEO title="Cookies" />
            <Page>
                <Section spacingTop="2" spacingBottom="3">
                    <GridContainer justify="center">
                        <Content>
                            <h1>Cookies</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tristique venenatis. Quisque ac lectus turpis. Ut commodo porta sapien eu hendrerit.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tristique venenatis. Quisque ac lectus turpis. Ut commodo porta sapien eu hendrerit.</p>
                            <ul>
                                <li><b>Necessary cookies</b> - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li><b>Necessary cookies</b> - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tristique venenatis. Quisque ac lectus turpis. Ut commodo porta sapien eu hendrerit.</p>
                            <br></br>
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
                                        {cookieInfo.map(({ type, name, purpose }) => (
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

const Content = styled.div`
    width: 100%;
    max-width: 750px;
`

const TableWrapper = styled.div`
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
        &:not(:last-child) {
            width: 20%;
        }
    }
`
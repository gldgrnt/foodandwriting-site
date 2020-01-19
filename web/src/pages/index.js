import React from "react"
import { Page, SEO } from '../components/global'
import { GridContainer, GridRow, GridCol } from '../components/layout'

const IndexPage = () => {

    return (
        <>
            <SEO title="Home" description="Website coming soon" />
            <Page>
                <GridContainer>
                    <GridRow>
                        <GridCol>
                            <h1>This is the homepage</h1>
                        </GridCol>
                    </GridRow>

                    <GridRow>
                        <GridCol cols="1">
                            This is 4 col
                        </GridCol>
                        <GridCol cols="1">
                            This col just fills up and up and up
                        </GridCol>
                    </GridRow>
                </GridContainer>

            </Page>
        </>
    )
}

export default IndexPage

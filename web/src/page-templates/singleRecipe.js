import React from "react"
import { Page } from '../components/layout'
// import { SEO } from '../utils'

import { PostHero } from '../components/post-sections'
import { Section } from '../components/layout'

const page = ({ pageContext }) => {
    
    const { title, category, featuredImage } = pageContext.data

    return (
        <Page>
            <Section spacingBottom="4">
                <PostHero imageSrcSet={featuredImage.asset.fluid.srcSetWebp} category={category.categoryOptions.singleName} title={title} />
            </Section>


        </Page>
    )
}

export default page

import React from "react"
import { graphql } from 'gatsby'

import { SEO } from '../utils'
import { PostHero, DefaultPostContent, RecipePostContent, About, RelatedPosts } from '../components/post-sections'
import { Page, Section } from '../components/layout'
import { urlFor } from '../utils'

export default ({ data: { sanityPost: { date, title, category, _rawFeaturedImage, seoDescription, _rawContent, relatedPosts }, allSanityPost } }) => {
    const autoRelatedPosts = allSanityPost
    // Variables
    const maxTextWidth = '750px'
    const metaImage = urlFor(_rawFeaturedImage).size(1200, 700).fit('min')

    return (
        <>
            <SEO title={`${title} recipe`} description={seoDescription} meta={[{ property: "og:image", content: metaImage }, { name: "twitter:image", content: metaImage }]} />
            <Page>
                <Section>
                    <PostHero featuredImage={_rawFeaturedImage} subtitle={category.title} title={title} />
                </Section>

                <Section spacingTop={{ 'monitor': 4, 'tablet': 3 }}>
                    {// Default content
                        _rawContent[0]._type === 'defaultContent' && <DefaultPostContent content={_rawContent[0].content} date={date} maxTextWidth={maxTextWidth} />
                    }

                    {// Recipe content
                        _rawContent[0]._type === 'recipeContent' && <RecipePostContent content={_rawContent[0]} />
                    }
                </Section>

                <Section spacingTop="4" spacingBottom={{ 'monitor': 5, 'mobile': 4 }}>
                    <About />
                </Section>

                {autoRelatedPosts.nodes.length > 0 &&
                    <Section spacingTop="4" spacingBottom="4" whiteGrey>
                        <RelatedPosts category={category} autoPosts={autoRelatedPosts.nodes} selectedPosts={relatedPosts} />
                    </Section>
                }
            </Page>
        </>
    )
}

/**
 * Page query
 */
export const postQuery = graphql`
  query ($_id: String, $cat_id: String) {
    sanityPost(_id: {eq: $_id}) {
        # Get full post data
        ...FullPostFragment      
        # Default content
        _rawContent(resolveReferences: {maxDepth: 10})
    }
    # Related Posts
    allSanityPost(filter: {category: {_id: {eq: $cat_id}}, _id: {ne: $_id}}, limit: 3, sort: {order: DESC, fields: date}) {
        nodes {
            ...PreviewPostFragment
            ...MediumFluidImageFragment
        }
    }
}
`
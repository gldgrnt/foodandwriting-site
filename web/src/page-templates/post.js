import React from "react"
import { graphql } from 'gatsby'

import { SEO } from '../utils'
import { PostHero, DefaultPostContent, RecipePostContent, About, RelatedPosts } from '../components/post-sections'
import { Page, Section } from '../components/layout'

export default ({ data: {post: {date, title, category, featuredImage, seoDescription, content, _rawContent, relatedPosts}, autoRelatedPosts} }) => {

    // Variables
    const maxTextWidth = '750px';

    return (
        <>
            <SEO title={`${title} recipe`} description={ seoDescription } />
            <Page>
                <Section>
                    <PostHero featuredImage={featuredImage} subtitle={category.title} title={title} />
                </Section>

                <Section spacingTop={{'monitor': 4, 'tablet': 3}}>
                    {// Default content
                        content[0]._type === 'defaultContent' && <DefaultPostContent content={_rawContent[0].content} date={date} maxTextWidth={maxTextWidth}/>
                    }

                    {// Recipe content
                        content[0]._type === 'recipeContent' && <RecipePostContent content={content[0]}/>
                    }
                </Section>

                <Section spacingBottom="7">
                    <About maxTextWidth={maxTextWidth} />
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
  query ($_id: String, $cat_id: String, $isDefaultPost: Boolean!) {
    post: sanityPost(_id: {eq: $_id}) {
        # Get full post data
        ...FullPostFragment      
        # Default content
        _rawContent(resolveReferences: {maxDepth: 10}) @include(if: $isDefaultPost)
        content @include(if: $isDefaultPost) {
            ...on SanityDefaultContent  {
                _type
            }
        }
        # Recipe content
        content @skip(if: $isDefaultPost) {
            ...on SanityRecipeContent  {
                ...RecipePostContentFragment
            }
        }
    }
    # Related Posts
    autoRelatedPosts: allSanityPost(filter: {category: {_id: {eq: $cat_id}}, _id: {ne: $_id}}, limit: 3, sort: {order: DESC, fields: date}) {
        nodes {
            ...PreviewPostFragment
            ...MediumFluidImageFragment
        }
    }
}
`
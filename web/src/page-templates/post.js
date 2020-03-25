import React from "react"
import { graphql } from 'gatsby'

import { SEO } from '../utils'
import { PostHero, DefaultPostContent, RecipePostContent } from '../components/post-sections'
import { Page, Section } from '../components/layout'

export default ({ data: {post: {date, title, category, featuredImage, seoDescription, content, _rawContent}} }) => {

    return (
        <>
            <SEO title={`${title} recipe`} description={ seoDescription } />
            <Page>
                <Section>
                    <PostHero featuredImage={featuredImage} subtitle={category.title} title={title} />
                </Section>

                <Section spacingTop={{'monitor': 5, 'laptop': 4, 'tablet': 3}} spacingBottom={{'monitor': 5, 'laptop': 4, 'tablet': 3}}>
                    {// Default content
                        content[0]._type === 'defaultContent' && <DefaultPostContent content={_rawContent[0].content} date={date}/>
                    }

                    {// Recipe content
                        content[0]._type === 'recipeContent' && <RecipePostContent content={content[0]}/>
                    }
                </Section>
            </Page>
        </>
    )
}

/**
 * Page query
 */
export const query = graphql`
  query ($_id: String, $isDefaultPost: Boolean!) {
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
  }
`
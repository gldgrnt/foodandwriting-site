import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { SEO } from '../utils'
import { Page, HalfImage } from '../components/layout'
import { FawBlockContent } from '../components/block-content'

/**
 * AboutPage component
 */
const AboutPage = ({ data: { sanityAbout: { title, snippet, image, _rawContent } } }) => {

    return (
        <>
            <SEO title="About" description={snippet} />
            <Page>
                <HalfImage fluidImageProps={image.asset.fluid}>
                    <h1>{title}</h1>
                    <FawBlockContent content={_rawContent} />
                </HalfImage>
            </Page>
        </>
    )
}

export default AboutPage


/**
 * PropTypes
 */
AboutPage.propTypes = {
    data: PropTypes.shape({
        sanityAbout: PropTypes.shape({
            snippet: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired
}


/**
 * GraphQL query
 */
export const query = graphql`
   query AboutPageQuery {
        sanityAbout {
            title
            snippet
            _rawContent
            image {
                asset {
                    fluid {
                        ...GatsbySanityImageFluid_noBase64
                    }
                }
            }            
        }
    } 
`
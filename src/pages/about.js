import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { SEO } from '../utils'
import { Page, HalfImage } from '../components/layout'
import { FawBlockContent } from '../components/block-content'
import { SmallCaps } from '../components/ui'

/**
 * AboutPage component
 */
const AboutPage = ({ data:{ sanityAbout: { snippet, image, _rawContent }} }) => {

    return (
        <>
            <SEO title="About" description={snippet} />
            <Page>
                <HalfImage fluidImageProps={image.asset.fluid}>
                    <SmallCaps as="p" size="small">Food &amp; Wrtiting</SmallCaps>
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
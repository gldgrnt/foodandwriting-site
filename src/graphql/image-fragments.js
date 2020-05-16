import { graphql } from 'gatsby'

/**
 * Large Fluid Image
 */
export const largeFluidImageFragment = graphql`
    fragment LargeFluidImageFragment on SanityPost {
        _rawFeaturedImage(resolveReferences: {maxDepth: 10})
        featuredImage {
            asset {
                fluid(maxWidth: 500) {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
    }
`

/**
 * Medium Fluid Image
 */
export const mediumFluidImageFragment = graphql`
    fragment MediumFluidImageFragment on SanityPost {
        featuredImage {
            asset {
                fluid(maxWidth: 300) {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
    }
`

/**
 * Small Fluid Image
 */
export const smallFluidImageFragment = graphql`
    fragment SmallFluidImageFragment on SanityPost {
        featuredImage {
            asset {
                fluid(maxWidth: 150) {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
    }
`

/**
 * Varaible Fluid Image
 */
export const VariableFluidImageFragment = graphql`
    fragment VariableFluidImageFragment on SanityPost {
        featuredImage {
            asset {
                fluid(maxWidth: $imageMaxWidth) {
                    ...GatsbySanityImageFluid_noBase64
                }
            }
        }
    }
`
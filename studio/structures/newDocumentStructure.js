import S from '@sanity/base/structure-builder'
import sanityClient from '@sanity/client'

const client = sanityClient({
    projectId: "s1s9nwnc",
    dataset: "development",
    useCdn: true
})

// client.fetch


export default [
    // Add in all initial values
    ...S.defaultInitialValueTemplateItems()
    
]
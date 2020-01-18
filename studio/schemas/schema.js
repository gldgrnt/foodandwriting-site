// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

//Schemas
import { recipe, blog, culture, config, about } from './documents'
import { flexImages, portableText, shoppingListItem, featuredImage, recipeInfo, imageWithAlt } from './objects'

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        //Documents
        recipe, blog, culture, about, config,
        //Objects
        flexImages, portableText, shoppingListItem, featuredImage, recipeInfo, imageWithAlt
    ])
})

// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

//Schemas
import { recipe, blog, culture, config, about, recipeCategory } from './documents'
import { flexImages, portableText, shoppingListItem, featuredImage, recipeInfo, imageWithAlt, categoryOptions } from './objects'

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        //Documents
        recipe, blog, culture, about, config, recipeCategory,
        //Objects
        flexImages, portableText, shoppingListItem, featuredImage, recipeInfo, imageWithAlt, categoryOptions
    ])
})

// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import { 
    config, 
    about,  
    home, 
    post,
    category,
} from './documents'

// Objects
import { 
    flexImages, 
    portableText, 
    shoppingListItem, 
    imageWithAlt, 
    defaultContent,
    recipeContent
} from './objects'

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        //Documents
        post, 
        about, 
        config, 
        home, 
        category,
        //Objects
        flexImages, 
        portableText, 
        shoppingListItem, 
        imageWithAlt, 
        defaultContent, 
        recipeContent,
    ])
})

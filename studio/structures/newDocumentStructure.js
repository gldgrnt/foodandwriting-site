import S from '@sanity/base/structure-builder'

export default [
    // Add in all initial values
    // ...S.defaultInitialValueTemplateItems()
    S.initialValueTemplateItem('recipe', {})
        .id('recipe')
        .title('Recipe'),
    // S.initialValueTemplateItem('category', {})
    //     .id('category')
    //     .title('Category'),
]
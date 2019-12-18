import S from '@sanity/base/structure-builder'

export default [
    // Add in all initial values
    // ...S.defaultInitialValueTemplateItems()
    S.initialValueTemplateItem('recipe', {})
        .id('recipe')
        .title('New recipe'),
    S.initialValueTemplateItem('blog', {})
        .id('blog')
        .title('New blog post'),
    S.initialValueTemplateItem('culture', {})
        .id('culture')
        .title('New culture post'),
]
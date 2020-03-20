import S from '@sanity/base/structure-builder'

export default [
    // New post
    S.initialValueTemplateItem('post', {})
        .id('post')
        .title('New post'),

    // New category
    S.initialValueTemplateItem('category', {})
        .id('category')
        .title('New category'),
        
    /**
     * Debugging
     * 
     * ...S.defaultInitialValueTemplateItems()
     */
    
]
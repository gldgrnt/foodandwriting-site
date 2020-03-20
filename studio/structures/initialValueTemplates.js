import T from '@sanity/base/initial-value-template-builder'

export default [
    ...T.defaults(),
    
    /**
     * Create post with an initialised category 
     */
    T.template({
        id: 'post-in-category',
        title: 'Post in category',
        schemaType: 'post',
        parameters: [{name: 'catId', type: 'string'}],
        value: params => ({
            category: {_type: 'reference', _ref: params.catId}
        })
    })
  ]
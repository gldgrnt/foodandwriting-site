import T from '@sanity/base/initial-value-template-builder'

export default [
    ...T.defaults(),
  
    T.template({
        id: 'post-in-category',
        title: 'Post in category',
        description: 'Post in a category',
        schemaType: 'post',
        parameters: [{name: 'catId', type: 'string'}],
        value: params => ({
            category: {_type: 'reference', _ref: params.catId}
        })
    })
  ]
export default {
    title: 'Recipes',
    name: 'recipeCategory',
    type: 'document',
    initialValue: {
        title: 'Recipes',
        slug: '/recipes',
    },
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            readOnly: true
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            readOnly: true,
        },
        {
            title: 'SEO Description',
            name: 'seoDecsription',
            description: 'Max characters 160',
            type: 'text',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Category options',
            name: 'categoryOptions',
            type: 'categoryOptions'
        }
    ]
}
import slugify from '../../utils'

export default {
    title: 'Post Meta',
    name: 'postMeta',
    type: 'object',
    fields: [
        {
            title: 'Date',
            name: 'date',
            type: 'datetime',
            options: {
                dateFormat: 'DD/MM/YYYY',
                timeFormat: 'HH:mm',
                timeStep: 60
            },
            validation: Rule => [
                Rule.required().error('Please add a date')
            ]
        },
        {
            title: 'Category',
            name: 'category',
            type: 'reference',
            to: [{ type: 'recipeCategory' }, { type: 'blogCategory' }, { type: 'cultureCategory' }],
            readOnly: true,  
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'Click generate to auto generate a slug',
            options: {
                source: 'title',
                slugify: slugify
            },
            validation: Rule => [
                Rule.required().error('Please add / generate a unique slug')
            ]
        },
        {
            title: 'SEO Description',
            name: 'seoDescription',
            type: 'text',
            description: 'Max characters 160',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
    ]
}
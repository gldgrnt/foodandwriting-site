export default {
    title: 'Culture',
    name: 'culture',
    type: 'document',
    fieldsets: [
        {
            title: 'Main Content',
            name: 'mainContent',
        }
    ],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100
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
        {
            title: 'Featured image',
            name: 'featuredImage',
            type: 'image',
            fieldsets: 'mainContent',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alt text',
                    name: 'alt',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    }
                },
            ],
        },
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
        }
    ]
}
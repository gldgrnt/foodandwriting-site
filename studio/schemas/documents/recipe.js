export default {
    title: 'Recipe',
    name: 'post',
    type: 'document',
    fieldsets: [
        { title: 'Main content', name: 'mainContent' }
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
            name: 'seoDecsription',
            description: 'Max characters 160',
            type: 'text',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Featured image',
            name: 'featuredImage',
            type: 'image',
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
        //Start of main content
        {
            title: 'Recipe info',
            name: 'recipeInfo',
            type: 'object',
            fieldset: 'mainContent',
            fields: [
                {
                    title: 'Serves',
                    name: 'serves',
                    type: 'number',
                    validation: Rule => [
                        Rule.integer().error('Must be a whole number'),
                        Rule.positive().error('Must be a number greater than 0')
                    ]
                },
                {
                    title: 'Difficulty',
                    name: 'difficulty',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Easy', value: 'easy' },
                            { title: 'Medium', value: 'medium' },
                            { title: 'Hard', value: 'hard' },
                        ],
                        layout: 'radio',
                        direction: 'horizontal'
                    },
                },
                {
                    title: 'Ready in',
                    name: 'readyIn',
                    type: 'string',
                }
            ]
        },
        {
            title: 'Shopping list',
            name: 'shoppingList',
            fieldset: 'mainContent',
            type: 'array',
            of: [
                {
                    title: 'Item',
                    type: 'shoppingListItem'
                }
            ]
        },
        {
            title: 'Recipe intro',
            name: 'recipeIntro',
            type: 'portableText',
            fieldset: 'mainContent'
        },
        {
            title: 'Recipe steps',
            name: 'steps',
            fieldset: 'mainContent',
            type: 'array',
            of: [
                {
                    type: 'text'
                }
            ]
        },
        {
            title: 'Notes',
            name: 'notes',
            type: 'text',
            fieldset: 'mainContent'
        }
    ]

}

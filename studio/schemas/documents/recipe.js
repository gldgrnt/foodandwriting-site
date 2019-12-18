import { MdDone } from 'react-icons/md'

export default {
    title: 'Recipe',
    name: 'recipe',
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
            description: 'Click generate to auto generate a slug',
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
            description: 'Press edit to change how the image appears for different sizes.',
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
                    type: 'shoppingListItem',
                    icon: MdDone,
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
            type: 'array',
            description: 'Add items and rearrange them by dragging the icon on the left. No need to add numbers at the start of each item.',
            fieldset: 'mainContent',
            of: [
                {
                    type: 'text',
                    rows: 3,
                }
            ]
        },
        {
            title: 'Notes',
            name: 'notes',
            type: 'portableText',
            fieldset: 'mainContent',
        },
    ],
    preview: {
        select: {
            title: 'title',
            image: 'featuredImage'
        },
        prepare(select) {
            const { title, image } = select

            return {
                title: title,
                subtitle: 'Recipe',
                media: image
            }
        }
    }

}

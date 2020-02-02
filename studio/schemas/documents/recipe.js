import { MdDone, MdLocalDining } from 'react-icons/md'

export default {
    title: 'Recipe',
    name: 'recipe',
    type: 'document',
    initialValue: {
        category: {
            _ref: 'recipeCategory'
        },
    },
    icon: MdLocalDining,
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
            title: 'Category',
            name: 'category',
            type: 'reference',
            to: [{ type: 'recipeCategory' }],
            readOnly: true,
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'Click generate to auto generate a slug',
            options: {
                source: 'title'
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
            type: 'featuredImage',
        },
        //Start of main content
        {
            title: 'Recipe info',
            name: 'recipeInfo',
            type: 'recipeInfo',
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
            type: 'text',
            rows: 8,
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

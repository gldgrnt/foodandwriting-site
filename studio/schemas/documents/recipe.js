import { MdDone, MdLocalDining } from 'react-icons/md'

export default {
    title: 'Recipe',
    name: 'recipe',
    type: 'document',
    initialValue: () => ({
        postMeta: {
            _type: 'postMeta',
            category: {
                _type: 'reference',
                _ref: 'recipeCategory',
            },
            date: (new Date()).toISOString()
        }
    }),
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
            title: 'Meta',
            name: 'postMeta',
            type: 'postMeta'
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
            name: 'recipeNotes',
            type: 'text',
            rows: 8,
            fieldset: 'mainContent',
        },
    ],
    orderings: [
        {
          title: 'Date',
          name: 'sortDate',
          by: [
            {field: 'postMeta.date', direction: 'desc'}
          ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'postMeta.date',
            image: 'featuredImage',
        },
        prepare(select) {
            const { title, date, image } = select

            //Format date
            let formattedDate = new Date(date)

            let d = formattedDate.getDate()
            let m = formattedDate.getMonth() + 1 < 10 ? `0${formattedDate.getMonth() + 1}` : formattedDate.getMonth() + 1
            let y = formattedDate.getFullYear()

            const postDate =  date ? `- ${d}/${m}/${y}` : ''

            return {
                title: title,
                subtitle: `Recipe ${postDate}`,
                media: image,
            }
        }
    }

}

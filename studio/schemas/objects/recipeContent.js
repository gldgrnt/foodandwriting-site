import { MdShortText, MdDone } from 'react-icons/md'

export default {
    title: 'Recipe content',
    name: 'recipeContent',
    type: 'object',
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
        },
        {
            title: 'Shopping list',
            name: 'shoppingList',
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
        },
        {
            title: 'Recipe steps',
            name: 'steps',
            type: 'array',
            description: 'Add items and rearrange them by dragging the icon on the left. No need to add numbers at the start of each item.',
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
        },
    ],
    preview: {
        select: {
        },
        prepare(select) {

            return {
                title: 'Recipe content',
                media: MdShortText
            }
        }
    }
}
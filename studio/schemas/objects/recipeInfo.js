export default {
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
}
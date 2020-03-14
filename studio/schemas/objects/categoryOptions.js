export default {
    title: 'Category options',
    name: 'categoryOptions',
    type: 'object',
    fields: [
        {
            title: 'Category type',
            name: 'categoryType',
            type: 'string',
            options: {
                list: ['Normal', 'Recipe'],
                layout: 'dropdown',
            },
            description: 'Choose whether posts in this category are normal blog posts or contain recipe options',
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'Single name',
            name: 'singleName',
            type: 'string',
            description: `Used when referencing a single post from this category. E.g Featured {SINGLE_NAME}`,
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'View all name',
            name: 'viewAllName',
            type: 'string',
            description: `Used for view all buttons. E.g View all {VIEW_ALL_NAME}`,
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'Cover photo',
            name: 'coverPhoto',
            type: 'imageWithAlt',
            description: 'Used for background imagery on category page and some featured sections',
            validation: Rule => [ Rule.required() ]
        }
    ]
}
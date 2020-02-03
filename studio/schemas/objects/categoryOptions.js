export default {
    title: 'Category options',
    name: 'categoryOptions',
    type: 'object',
    fields: [
        {
            title: 'Single name',
            name: 'singleName',
            type: 'string',
            description: `Used when referencing a single post from this category. E.g Featured {SINGLE NAME}`
        },
        {
            title: 'View all name',
            name: 'viewAllName',
            type: 'string',
            description: `Used for view all buttons. E.g View all {VIEW ALL NAME}`
        },
        {
            title: 'Cover photo',
            name: 'coverPhoto',
            type: 'imageWithAlt',
            description: 'Used for background imagery on category page and some featured sections'
        }
    ]
}
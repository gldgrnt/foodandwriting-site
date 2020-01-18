export default {
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
}
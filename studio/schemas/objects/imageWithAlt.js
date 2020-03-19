export default {
    title: 'Image',
    name: 'imageWithAlt',
    type: 'image',
    description: 'Press edit to change how the image appears for different sizes.',
    options: {
        hotspot: true
    },
    fields: [
        {
            type: 'string',
            name: 'alt',
            title: 'Alt',
            options: {
                isHighlighted: true
            }
        },
    ]
}
import FlexImages from '../../components/FlexImages'

export default {
    title: 'Flex images',
    name: 'flexImages',
    type: 'object',
    fields: [
        {
            title: 'Images',
            name: 'images',
            type: 'array',
            layout: 'grid',
            of: [
                {
                    type: 'image',
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
                },

            ],
        },
        {
            title: 'Caption',
            name: 'caption',
            type: 'string',
        }
    ],
    preview: {
        select: {
            images: 'images',
            caption: 'caption'
        },
        component: FlexImages
    }
}
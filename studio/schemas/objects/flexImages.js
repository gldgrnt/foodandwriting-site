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
                    type: 'imageWithAlt',
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
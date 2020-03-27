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
            description: 'Add 1 or two images in a row. A single image should be landscape and 2 images should be 2 portrait images of the same size.',
            layout: 'grid',
            of: [
                {
                    type: 'imageWithAlt',
                },

            ],
            validation: Rule => [
                Rule.max(2).error('You can only add two images in a row')
            ],
        },
        {
            title: 'Caption',
            name: 'caption',
            type: 'string',
            description: 'This will appear under the image(s) in italic text. Can be left blank.',
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
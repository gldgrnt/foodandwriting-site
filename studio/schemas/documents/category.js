import { MdLocalOffer } from 'react-icons/md'

import slugify from '../../utils'

export default {
    title: 'Category',
    name: 'category',
    type: 'document',
    icon: MdLocalOffer,
    initialValue: () => ({
        categoryOptions: {
            _type: 'categoryOptions',
            categoryType: 'Normal'
        }
    }),
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'foodandwriting.co.uk/{CATEGORY_NAME}',
            options: {
                source: 'title',
                slugify: slugify
            }
        },
        {
            title: 'SEO Description',
            name: 'seoDecsription',
            description: 'Max characters 160',
            type: 'text',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Category options',
            name: 'categoryOptions',
            type: 'categoryOptions'
        }
    ]
}
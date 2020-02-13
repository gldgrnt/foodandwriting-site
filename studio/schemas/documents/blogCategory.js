import { MdLocalOffer } from 'react-icons/md'

export default {
    title: 'Blog',
    name: 'blogCategory',
    type: 'document',
    icon: MdLocalOffer,
    initialValue: {
        title: 'Blog',
        slug: {
            _type: 'slug',
            current: 'blog',
        }
    },
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            readOnly: true
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            readOnly: true,
            description: 'foodandwriting.co.uk/blog'
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
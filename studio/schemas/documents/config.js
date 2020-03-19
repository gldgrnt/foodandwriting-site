import { MdSettings } from 'react-icons/md'

export default {
    title: 'Global config',
    name: 'config',
    type: 'document',
    fieldsets: [
        {
            title: 'SEO',
            name: 'seo',
        }
    ],
    fields: [
        {
            title: 'SEO Description',
            name: 'seoDecsription',
            type: 'text',
            fieldset: 'seo',
            description: 'Max characters 160',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Social media image',
            name: 'socialMediaImage',
            type: 'image',
            description: 'Image used when sharing the site to social media (posts will use their featured image when shared)',
            fieldset: 'seo'
        },
    ],
    preview: {
        select: {
            title: 'seoDescription',
        },
        prepare(select) {
            return {
                title: 'Global Config',
                media: MdSettings
            }
        }
    }
}
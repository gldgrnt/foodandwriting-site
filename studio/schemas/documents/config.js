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
        }
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
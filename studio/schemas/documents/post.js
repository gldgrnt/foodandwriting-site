import Moment from 'moment'
import { MdImportContacts } from 'react-icons/md'
import slugify from '../../utils'

export default {
    title: 'post',
    name: 'post',
    type: 'document',
    icon: MdImportContacts,
    fieldsets: [
        {
            title: 'Meta',
            name: 'meta'
        },
        {
            title: 'Main Content',
            name: 'mainContent',
        }
    ],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        // Meta
        {
            title: 'Date',
            name: 'date',
            type: 'datetime',
            fieldset: 'meta',
            options: {
                dateFormat: 'DD/MM/YYYY',
                timeFormat: 'HH:mm',
                timeStep: 60
            },
            validation: Rule => [
                Rule.required().error('Please add a date')
            ]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            fieldset: 'meta',
            description: 'Click generate to auto generate a slug',
            options: {
                source: 'title',
                slugify: slugify
            },
            validation: Rule => [
                Rule.required().error('Please add / generate a unique slug')
            ]
        },
        {
            title: 'Category',
            name: 'category',
            type: 'reference',
            fieldset: 'meta',
            to: [{ type: 'category' },],
            validation: Rule => [
                Rule.required().error('Add this post to a category')
            ]
        },
        {
            title: 'Featured image',
            name: 'featuredImage',
            type: 'imageWithAlt',
            fieldset: 'meta',
        },
        {
            title: 'SEO Description',
            name: 'seoDescription',
            type: 'text',
            fieldset: 'meta',
            description: 'Max characters 160',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        // Content
        {
            title: 'Content',
            name: 'content',
            type: 'array',
            of: [
                { type: 'defaultContent', },
                { type: 'recipeContent'},
            ],
            options: {
                sortable: false,
            },
            description: 'Choose the corresponding content type (Default or recipe)',
            validation: Rule => [
                Rule.required().length(1).error('Choose 1 main content type')
            ]
        }
    ],
    orderings: [
        {
          title: 'Date',
          name: 'sortDate',
          by: [
            {field: 'date', direction: 'desc'}
          ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            image: 'featuredImage',
            category: 'category.title'
        },
        prepare(select) {
            const { title, date, image, category } = select

            //Format the subtitle
            const seperator = category && date ? ' - ' : ''
            const formattedDate = date ? Moment(date).format('DD/MM/YYYY') : ''
            const categoryTitle = category || ''

            const subtitle = categoryTitle + seperator + formattedDate

            return {
                title: title,
                subtitle: subtitle,
                media: image,
            }
        }
    }
}

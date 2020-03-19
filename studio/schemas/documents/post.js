import Moment from 'moment'
import { MdImportContacts } from 'react-icons/md'

export default {
    title: 'post',
    name: 'post',
    type: 'document',
    icon: MdImportContacts,
    fieldsets: [
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
        {
            // Containg date, category, slug, seo, featuredImage
            title: 'Meta',
            name: 'postMeta',
            type: 'postMeta'
        },
        {
            // Main post data
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
            {field: 'postMeta.date', direction: 'desc'}
          ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'postMeta.date',
            image: 'postMeta.featuredImage',
            category: 'postMeta.category.title'
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

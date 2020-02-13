import slugify from '../../utils'
import { MdImportContacts } from 'react-icons/md'

export default {
    title: 'Blog',
    name: 'blog',
    type: 'document',
    initialValue: () => ({
        postMeta: {
            _type: 'postMeta',
            category: {
                _type: 'reference',
                _ref: 'blogCategory',
            },
            date: (new Date()).toISOString()
        }
    }),
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
            title: 'Meta',
            name: 'postMeta',
            type: 'postMeta'
        },
        {
            title: 'Featured image',
            name: 'featuredImage',
            type: 'featuredImage',
            fieldsets: 'mainContent',
        },
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
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
            image: 'featuredImage',
        },
        prepare(select) {
            const { title, date, image } = select

            //Format date
            let formattedDate = new Date(date)

            let d = formattedDate.getDate()
            let m = formattedDate.getMonth() + 1 < 10 ? `0${formattedDate.getMonth() + 1}` : formattedDate.getMonth() + 1
            let y = formattedDate.getFullYear()

            return {
                title: title,
                subtitle: `Blog - ${d}/${m}/${y}`,
                media: image,
            }
        }
    }
}

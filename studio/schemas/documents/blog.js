import { MdImportContacts } from 'react-icons/md'

export default {
    title: 'Blog',
    name: 'blog',
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
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'Click generate to auto generate a slug',
            options: {
                source: 'title',
                slugify: (input) => {
                    let titleSlug = input.toLowerCase().replace(/\s+/g, '-').slice(0, 100)
                    return `blog/${titleSlug}`
                },
            },
            validation: Rule => [
                Rule.required().error('Please add / generate a unique slug')
            ]
        },
        {
            title: 'SEO Description',
            name: 'seoDescription',
            type: 'text',
            description: 'Max characters 160',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
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
    preview: {
        select: {
            title: 'title',
            createdAt: '_createdAt',
            image: 'featuredImage',
        },
        prepare(select) {
            const { title, createdAt, image } = select

            //Format date
            let date = new Date(createdAt)
            let d = date.getDate()
            let m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
            let y = date.getFullYear()

            return {
                title: title,
                subtitle: `Blog - ${d}/${m}/${y}`,
                media: image,
            }
        }
    }
}

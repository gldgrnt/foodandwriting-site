import { MdPerson } from 'react-icons/md'

export default {
    title: 'About',
    name: 'about',
    type: 'document',
    fieldsets: [
        {
            title: 'Small bio',
            name: 'smallBio',
        },
        {
            title: 'Main content',
            name: 'mainContent'
        }
    ],
    fields: [
        {
            title: 'Small image',
            name: 'smallImage',
            type: 'imageWithAlt',
            fieldset: 'smallBio',
            description: 'Image used at the end of recipes and blog posts. Size Xpx by Ypx',
        },
        {
            title: 'Snippet',
            name: 'snippet',
            type: 'text',
            fieldset: 'smallBio',
            description: 'Max 160 characters (This will be used as the SEO description as well)',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Large Image',
            name: 'image',
            type: 'imageWithAlt',
            fieldset: 'mainContent',
        },
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
            fieldset: 'mainContent',
        },
    ],
    preview: {
        select: {
            title: 'smallBio',
        },
        prepare(select) {
            return {
                title: 'About page',
                media: MdPerson
            }
        }
    }
}
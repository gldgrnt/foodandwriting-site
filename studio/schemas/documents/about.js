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
            type: 'image',
            fieldset: 'smallBio',
            description: 'Image used at the end of recipes and blog posts. Size Xpx by Ypx',
            fields: [
                {
                    title: 'Alt',
                    name: 'alt',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    }
                }
            ]
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
            type: 'image',
            fieldset: 'mainContent',
            fields: [
                {
                    title: 'Alt',
                    name: 'alt',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    }
                }
            ]
        },
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
            fieldset: 'mainContent',
        },
    ]
}
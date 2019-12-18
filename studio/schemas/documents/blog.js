export default {
    title: 'Blog',
    name: 'blog',
    type: 'document',
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
                maxLength: 100
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
            type: 'image',
            description: 'Press edit to change how the image appears for different sizes.',
            fieldsets: 'mainContent',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alt text',
                    name: 'alt',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    }
                },
            ],
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
            let date = new Date(createdAt);
            let d = date.getDate();
            let m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let y = date.getFullYear();

            return {
                title: title,
                subtitle: `Blog - ${d}/${m}/${y}`,
                media: image,
            }
        }
    }
}

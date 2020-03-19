export default {
    title: 'Home',
    name: 'home',
    type: 'document',
    initialValue: {
        showFeaturedTopic: true
    },
    fieldsets: [
        {
            title: 'Featured topic',
            name: 'featuredTopic',
        },
        {
            title: 'Parallax topic',
            name: 'parallaxTopic'
        },
        {
            title: 'Bottom featured post',
            name: 'bottomFeaturedPost',
        }
    ],
    fields: [
        {
            title: 'Subtitle',
            name: 'featuredTopicSubtitle',
            type: 'string',
            fieldset: 'featuredTopic'
        },
        {
            title: 'Title',
            name: 'featuredTopicTitle',
            type: 'string',
            fieldset: 'featuredTopic'
        },
        {
            title: 'Posts',
            name: 'featuredTopicPosts',
            type: 'array',
            of: [
                {
                    title: 'Post',
                    type: 'reference',
                    to: [{type: 'post'},]
                },
            ],
            fieldset: 'featuredTopic',
            validation: Rule => [
                Rule.unique().max(2).error('Please select 2 unique posts')
            ]
        }
    ]
}
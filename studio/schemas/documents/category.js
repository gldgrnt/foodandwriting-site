import { MdBook } from 'react-icons/md'
import slugify from '../../utils'

export default {
    title: 'Category',
    name: 'category',
    type: 'document',
    icon: MdBook,
    fieldsets: [
        {
            title: 'Category options',
            name: 'categoryOptions'
        }
    ],
    initialValue: () => ({
        categoryType: 'Normal'
    }),
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'foodandwriting.co.uk/{CATEGORY_NAME}',
            options: {
                source: 'title',
                slugify: slugify
            }
        },
        {
            title: 'SEO Description',
            name: 'seoDecsription',
            description: 'Max characters 160',
            type: 'text',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Category type',
            name: 'categoryType',
            type: 'string',
            fieldset: 'categoryOptions',    
            options: {
                list: ['Normal', 'Recipe'],
                layout: 'dropdown',
            },
            description: 'Choose whether posts in this category are normal blog posts or contain recipe options',
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'Single name',
            name: 'singleName',
            type: 'string',
            description: `Used when referencing a single post from this category. E.g Featured {SINGLE_NAME}`,
            fieldset: 'categoryOptions',
            validation: Rule => [ Rule.required() ]
        },
        {
            title: 'View all name',
            name: 'viewAllName',
            type: 'string',
            description: `Used for view all buttons. E.g View all {VIEW_ALL_NAME}`,
            fieldset: 'categoryOptions',
            validation: Rule => [ Rule.required() ]
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare: ({ title }) => {
            return {
                title,
            }
        }
    }
}
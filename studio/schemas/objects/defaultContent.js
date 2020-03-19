import { MdShortText } from 'react-icons/md'

export default {
    title: 'Default content',
    name: 'defaultContent',
    type: 'object',
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
        }
    ],
    preview: {
        select: {
        },
        prepare(select) {

            return {
                title: 'Default content',
                media: MdShortText
            }
        }
    }
}
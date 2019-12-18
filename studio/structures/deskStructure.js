import S from '@sanity/desk-tool/structure-builder'
import { MdLocalDining, MdColorLens, MdImportContacts, MdSettings, MdPerson } from 'react-icons/md'

export default () =>
    S.list()
        .title('Admin')
        .items([
            //Recipes
            S.listItem()
                .title('Recipes')
                .icon(MdLocalDining)
                .child(
                    S.documentTypeList('recipe')
                        .title('Recipes')
                        .id('recipes')
                ),
            //Blog posts
            S.listItem()
                .title('Blog posts')
                .icon(MdImportContacts)
                .child(
                    S.documentTypeList('blog')
                        .title('Blogs posts')
                        .id('blogs')
                ),
            //Culture
            S.listItem()
                .title('Culture posts')
                .icon(MdColorLens)
                .child(
                    S.documentTypeList('culture')
                        .title('Culture posts')
                        .id('culture')
                ),
            S.divider(),
            //About
            S.listItem()
                .title('About')
                .icon(MdPerson)
                .child(
                    S.editor()
                        .title('About')
                        .id('about')
                        .schemaType('about'),
                ),
            //Config
            S.listItem()
                .title('Global config')
                .icon(MdSettings)
                .child(
                    S.editor()
                        .title('Global config')
                        .id('global-config')
                        .schemaType('config'),
                ),
            //All documents [debugging]
            // S.divider(),
            // S.listItem()
            //     .title('Everything')
            //     .child(
            //         S.list()
            //             .title('Everything')
            //             .items([
            //                 ...S.documentTypeListItems()
            //             ])
            //     )
        ])
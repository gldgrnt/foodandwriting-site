import S from '@sanity/desk-tool/structure-builder'
import { MdLocalDining, MdImportContacts, MdSettings, MdPerson, MdStyle, MdLocalOffer, MdHome } from 'react-icons/md'
import { IoMdDocument, IoIosFolderOpen } from 'react-icons/io'

export default () =>
    S.list()
        // Main Admin
        .title('Admin') .items([
            // Homepage
            S.listItem().title('Home').icon(MdHome).child(
                // Homepage editor
                S.editor().title('Home').id('home').schemaType('home'),
            ),
            // About
            S.listItem().title('About').icon(MdPerson).child(
                // About editor
                S.editor().title('About').id('about').schemaType('about'),
            ),
            // Divider 
            S.divider(),
            // Posts
            S.listItem().title('Posts').icon(IoMdDocument).child(
                S.list().title('Posts').items([
                    // All posts
                    S.listItem().title('All').icon(IoMdDocument),
                    // Divicder
                    S.divider(),
                    // By category
                    ...S.documentTypeListItems().filter( item => item.schemaType() === 'category' )
                ])
            ),
            // TEMPORARY
            S.documentTypeListItem('category'),
            // Divider
            S.divider(),
            // Config
            S.listItem()
                .title('Global config')
                .icon(MdSettings)
                .child(
                    S.editor()
                        .title('Global config')
                        .id('global-config')
                        .schemaType('config'),
                ),
            
            /* FOR DEBUGGING */
            //All documents
            // S.divider(),
            // S.listItem().title('Everything').child(
            //     S.list().title('Everything').items([
            //             ...S.documentTypeListItems()
            //         ])
            //     )
        ])
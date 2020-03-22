import S from '@sanity/desk-tool/structure-builder'
import { MdLibraryBooks, MdSettings, MdPerson, MdCollectionsBookmark, MdHome, MdFilterNone } from 'react-icons/md'

export default () =>
    S.list().title('Admin') .items([
        
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
        S.listItem().title('Posts').icon(MdLibraryBooks).child(
            S.list().title('Posts').items([

                // All posts
                S.listItem().title('All posts').icon(MdLibraryBooks).child(
                    S.documentTypeList('post').title('All posts').defaultOrdering([{field: 'postMeta.date', direction: 'desc'}])
                ),

                // Divider
                S.divider(),

                // Published
                S.listItem().title('Published').icon(MdLibraryBooks).child(
                    S.documentList().schemaType('post').title('Published posts').filter('_type == "post" && !(_id in path("drafts.**"))')
                ),

                // Drafts
                S.listItem().title('Drafts').icon(MdFilterNone).child(
                    S.documentList().schemaType('post').title('Draft posts').filter('_type == "post" && _id in path("drafts.**")')
                ),
            ])
        ),

        // By category
        S.listItem().title('Posts by category').icon(MdCollectionsBookmark).child(

            // List out all categories
            S.documentTypeList('category').title('Posts by category').child(catId =>

                // List out project documents where the _id for the selected
                S.documentList().schemaType('post').title('Posts').filter('_type == "post" && category._ref == $catId').params({ catId }).initialValueTemplates([
                    S.initialValueTemplateItem('post-in-category', {catId})
                  ])
            )
        ),

        // Divider
        S.divider(),

        // Categories
        S.documentTypeListItem('category').title('Categories').icon(MdCollectionsBookmark),

        // Divider
        S.divider(),

        // Config
        S.listItem().title('Global config').icon(MdSettings).child(
            S.editor().title('Global config').id('global-config').schemaType('config'),
        ),

        /**
         * Debugging
         * 
         * S.divider()
         * S.listItem().title('Everything').child(S.list().title('Everything').items([...S.documentTypeListItems()]))
         */
    ])
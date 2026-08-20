import translationsFilter from '../filter/translations.js';

export default `
id,
isActive: is_active
inMainNavigation: in_main_navigation
metaTranslations: meta_translations(${translationsFilter}) {
    title
}
sections {
    item {
        ...on pages_sections__basic {
            isMenuItem: is_menu_item
            translations {
                slug
                title
            }
        }
    }
}`;

import translationsFilter from './filter/translations.js';
import {basicFields as basicEventsFields} from './fields/events.js';

export default `#graphql
query($lang: String){
    pages(filter: {is_active: {_eq: true}}) {
        id
        isActive: is_active
        metaTranslations: meta_translations(${translationsFilter}) {
            title
        }
    }
    editions(sort: "-year") {
        year
        translations(${translationsFilter}) {
            title
        }
        events {
            ${basicEventsFields}
        }
    }
}`;
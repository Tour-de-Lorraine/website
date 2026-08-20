import {basicFields as basicEditionsFields} from './fields/editions.js';

export default `#graphql
query($page_id: ID!, $lang: String){
    additionalContent: pages_by_id(id: $page_id) {
        translations: archive_translations {
            formatedText: formated_text
        }
    }
    editions(sort: "-year") {
        ${basicEditionsFields}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;

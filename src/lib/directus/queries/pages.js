import translationsFilter from './filter/translations.js';
import heroFields from './fields/hero.js';

export default `#graphql
query($page_id: ID!, $lang: String){
    page: pages_by_id(id: $page_id) {
        id
        type
        isActive: is_active
        metaTranslations: meta_translations(${translationsFilter}) {
            title
            description
        }
        hero {
            ${heroFields}
        }
	}
}`;

import pageSectionsFields from './fields/pageSections.js';
import pageSectionsFilter from './filter/pageSections.js';

export default `#graphql
query($page_id: String, $lang: String){
    sections: pages_sections(sort: "order", ${pageSectionsFilter}) {
    	${pageSectionsFields}
	},
}`;

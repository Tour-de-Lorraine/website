import pageSectionBasicFields from './pageSectionBasic.js';

export default `
collection
item {
    ... on pages_sections__basic {
        ${pageSectionBasicFields}
    }
}`;

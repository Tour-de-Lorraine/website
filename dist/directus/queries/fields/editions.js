import visualFields from './visual.js';
import {basicFields as basicEventsFields} from './events.js';
import detailsFields from './details.js';

import translationsFilter from '../filter/translations.js';

const basicFields = `
year
translations(${translationsFilter}) {
    title
}
visual {
    ${visualFields}
}
details(sort: "order") {
    item {
        ${detailsFields}
    }
}
useOtherProgramSource: use_other_program_source
otherProgramSourceType: other_program_source_type
otherProgramUrl: other_program__url
otherProgramPdf: other_program__pdf {
    type
    id
}`;

const allFields = `
${basicFields}
events {
    ${basicEventsFields}
}`;

export default allFields;
export {basicFields};

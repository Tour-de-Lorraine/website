import eventsCategoriesFields from './eventsCategories.js';
import imageFields from './image.js';
import detailsFields from './details.js';
import videoFields from './video.js';
import translationsFilter from '../filter/translations.js';
import eventsAttributesFields from './eventsAttributes.js';
import eventsIssuesFields from './eventsIssues.js';
import heroFields from './hero.js';

export const text = `
translations(${translationsFilter}) {
    title
    slug
    description
}`;

export const attributes = `
attributes {
    junction: events_attributes_id {
        ${eventsAttributesFields}
    }
}`;

export const categories = `
categories {
    junction: events_categories_id {
        ${eventsCategoriesFields}
    }
}`;

export const hero = `
hero {
    ${heroFields}
}`;
export const issues = `
issues(sort: "date_start") {
    ${eventsIssuesFields}
}`;
export const details = `
details {
    item {
        ${detailsFields}
    }
}`;
export const images = `
images {
    ele_images_id {
        ${imageFields}
    }
}`;
export const videos = `
videos {
    item {
        ${videoFields}
    }
}`;

export const allFields = `
id
${text}
${attributes}
${categories}
${hero}
${details}
${images}
${issues}
${videos}`;

export const basicFields = `
id
${text}
${attributes}
${issues}
${categories}`;

export default allFields;

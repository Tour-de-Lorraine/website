import translationsFilter from '../filter/translations.js';
import imageFields from './image.js';

export const detailsDrawer = `
translations(${translationsFilter}) {
    title
    formatedText: formated_text
}`;

export const detailsLink = `
translations(${translationsFilter}) {
    label
    url
}`;

export const detailsPdf = `
pdf {
    translations(${translationsFilter}) {
        title
        file(filter: {type: {_eq: "application/pdf"}}) {
            id
            type
        }
    }
}`;

export const detailsMedia = `
translations(${translationsFilter}) {
    title
}
images {
    eleImagesId: ele_images_id {
        ${imageFields}
    }
}`;

export default `#graphql
type: __typename
...on ele_details__drawer {
    ${detailsDrawer}
}
...on ele_details__link {
    ${detailsLink}
}
...on ele_details__pdf {
    ${detailsPdf}
}`;

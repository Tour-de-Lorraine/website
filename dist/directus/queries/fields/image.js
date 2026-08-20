import translationsFilter from '../filter/translations.js';

export const imageMeta = `
id
height
width
focalPointX: focal_point_x
focalPointY: focal_point_y`;

export default `
translations(${translationsFilter}) {
    altText: alt_text
    caption
}
image {
    ${imageMeta}
}`;

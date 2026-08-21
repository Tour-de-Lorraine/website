import translationsFilter from '../filter/translations.js';
import detailsFields from './details.js';
import imageFields from './image.js';

export default `#graphql
translations(${translationsFilter}) {
    title
    formatedText: formated_text
    slug
}
images {
    eleImagesId: ele_images_id {
        ${imageFields}
    }
}
details {
    item {
        ${detailsFields}
    }
}
isMenuItem: is_menu_item`;

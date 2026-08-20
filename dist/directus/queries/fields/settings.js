import translationsFilter from '../filter/translations.js';

export default `
themeColor1: theme_color_1
themeColor2: theme_color_2
footerLinks: footer_links {
    translations(${translationsFilter}) {
        label
        url
    } 
}`;

import translationsFilter from '../filter/translations.js';

export default `
themeColor1: theme_color_1
themeColor2: theme_color_2
displayTicketing: display_ticketlink
ticketingLink: ticketing_link
footerLinks: footer_links {
    translations(${translationsFilter}) {
        label
        url
    } 
}`;

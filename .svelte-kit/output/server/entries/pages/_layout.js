import { t as translationsFilter, s as safeFetch, d as directusGraphql } from "../../chunks/translations.js";
const siteNavigationFields = `
id,
isActive: is_active
inMainNavigation: in_main_navigation
metaTranslations: meta_translations(${translationsFilter}) {
    title
}
sections {
    item {
        ...on pages_sections__basic {
            isMenuItem: is_menu_item
            translations {
                slug
                title
            }
        }
    }
}`;
const settingsFields = `
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
const siteQuery = `#graphql
query($lang: String){
    navigation: pages(sort: "order") {
        ${siteNavigationFields}
    }
    settings {
        ${settingsFields}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;
async function fetchSite() {
  return await safeFetch(async function fetchSite2() {
    const data = await directusGraphql.query(siteQuery, {
      lang: "de"
    });
    return data;
  });
}
async function load() {
  try {
    const data = await fetchSite();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export {
  load
};

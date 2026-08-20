import { t as translationsFilter, s as safeFetch, d as directusGraphql } from "./translations.js";
import { h as heroFields, i as imageFields, d as detailsFields } from "./events.js";
import { a as allFields, s as sortEvents, b as basicFields } from "./sortEvents.js";
const pagesQuery = `#graphql
query($page_id: ID!, $lang: String){
    page: pages_by_id(id: $page_id) {
        id
        type
        isActive: is_active
        metaTranslations: meta_translations(${translationsFilter}) {
            title
            description
        }
        hero {
            ${heroFields}
        }
	}
}`;
const currentEditionQuery = `#graphql
query($lang: String) {
    currentEdition: current_edition {
        edition {
            id,
            ${allFields}
        }
    }
}`;
async function fetchCurrentEdition() {
  return await safeFetch(async function fetchCurrentEdition2() {
    const data = await directusGraphql.query(currentEditionQuery, {
      lang: "de"
    });
    const currentEdition = data.currentEdition.edition;
    const sortedEvents = sortEvents(currentEdition?.events || []);
    return {
      currentEdition: {
        ...currentEdition,
        events: sortedEvents
      }
    };
  });
}
const pageSectionBasicFields = `#graphql
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
const pageSectionsFields = `
collection
item {
    ... on pages_sections__basic {
        ${pageSectionBasicFields}
    }
}`;
const pageSectionsFilter = `filter: {pages_id: {id: {_eq: $page_id}}}`;
const pagesSectionsQuery = `#graphql
query($page_id: String, $lang: String){
    sections: pages_sections(sort: "order", ${pageSectionsFilter}) {
    	${pageSectionsFields}
	},
}`;
async function fetchPageSections(pageId = "") {
  return await safeFetch(async function fetchPageSections2() {
    return await directusGraphql.query(pagesSectionsQuery, {
      page_id: pageId,
      lang: "de"
    });
  });
}
const archiveQuery = `#graphql
query($page_id: ID!, $lang: String){
    additionalContent: pages_by_id(id: $page_id) {
        translations: archive_translations {
            formatedText: formated_text
        }
    }
    editions(sort: "-year") {
        ${basicFields}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;
async function fetchArchive(pageId) {
  return await safeFetch(async function fetchArchive2() {
    const data = await directusGraphql.query(archiveQuery, {
      lang: "de",
      page_id: pageId
    });
    const additionalContent = data.additionalContent;
    const editions = data.editions;
    const currentEdition = data?.currentEdition?.edition || null;
    const archived = currentEdition ? data.editions.filter((edition) => edition.year < currentEdition.year) : editions;
    return { archived, additionalContent };
  });
}
async function fetchPage(pageId = "") {
  return await safeFetch(async function fetchPage2() {
    const { page } = await directusGraphql.query(pagesQuery, {
      page_id: pageId,
      lang: "de"
    });
    if (!page || !page.type) {
      throw `Can not fetch Page "${pageId}".`;
    }
    const content = page.type === "sections" ? await fetchPageSections(pageId) : page.type === "edition" ? await fetchCurrentEdition() : page.type === "archive" ? await fetchArchive(pageId) : {};
    return {
      ...page,
      ...content
    };
  });
}
export {
  fetchPage as f
};

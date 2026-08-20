import { t as translationsFilter } from "./translations.js";
const imageMeta = `
id
height
width
focalPointX: focal_point_x
focalPointY: focal_point_y`;
const imageFields = `
translations(${translationsFilter}) {
    altText: alt_text
    caption
}
image {
    ${imageMeta}
}`;
const extern = `
translations(${translationsFilter}) {
    title
    alt_text
    video_id
    video_platform
}`;
const videoInternMeta = `
id
type`;
const intern = `
translations(${translationsFilter}) {
    title
    alt_text
    videoLarge: video_large {
        ${videoInternMeta}
    }
    videoMiddle: video_middle {
        ${videoInternMeta}
    }
    videoSmall: video_small {
        ${videoInternMeta}
    }
    useResponsive: use_responsive
}`;
const videoFields = `
...on ele_videos {
    ${intern}
}
... on ele_videos__extern {
    ${extern}
}`;
const heroFields = `
id,
image {
    ${imageFields}
}
useVideo: use_video
video {
    ${intern}
}`;
const eventsCategoriesFields = `
translations(${translationsFilter}) {
    name
}
`;
const detailsDrawer = `
translations(${translationsFilter}) {
    title
    formatedText: formated_text
}`;
const detailsLink = `
translations(${translationsFilter}) {
    label
    url
}`;
const detailsPdf = `
pdf {
    translations(${translationsFilter}) {
        title
        file(filter: {type: {_eq: "application/pdf"}}) {
            id
            type
        }
    }
}`;
const detailsFields = `#graphql
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
const eventsAttributesFields = `
iconKey: icon_key
translations(${translationsFilter}) {
    name
}
`;
const eventsIssuesFields = `
dateStart: date_start
timeStart: time_start
dateEnd: date_end
timeEnd: time_end
location
locationUrl: location_url`;
const text = `
translations(${translationsFilter}) {
    title
    slug
    description
}`;
const attributes = `
attributes {
    junction: events_attributes_id {
        ${eventsAttributesFields}
    }
}`;
const categories = `
categories {
    junction: events_categories_id {
        ${eventsCategoriesFields}
    }
}`;
const hero = `
hero {
    ${heroFields}
}`;
const issues = `
issues(sort: "date_start") {
    ${eventsIssuesFields}
}`;
const details = `
details {
    item {
        ${detailsFields}
    }
}`;
const images = `
images {
    ele_images_id {
        ${imageFields}
    }
}`;
const videos = `
videos {
    item {
        ${videoFields}
    }
}`;
const allFields = `
id
${text}
${attributes}
${categories}
${hero}
${details}
${images}
${issues}
${videos}`;
const basicFields = `
id
${text}
${attributes}
${issues}
${categories}`;
export {
  allFields as a,
  intern as b,
  basicFields as c,
  detailsFields as d,
  heroFields as h,
  imageFields as i
};

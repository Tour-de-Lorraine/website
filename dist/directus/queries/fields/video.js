import translationsFilter from '../filter/translations.js';

export const extern = `
translations(${translationsFilter}) {
    title
    alt_text
    video_id
    video_platform
}`;

export const videoInternMeta = `
id
type`;

export const intern = `
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

export default `
...on ele_videos {
    ${intern}
}
... on ele_videos__extern {
    ${extern}
}`;

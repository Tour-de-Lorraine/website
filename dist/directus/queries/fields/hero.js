import imageFields from './image.js';
import {intern as videoFields} from './video.js';

export default `
id,
image {
    ${imageFields}
}
useVideo: use_video
video {
    ${videoFields}
}`;

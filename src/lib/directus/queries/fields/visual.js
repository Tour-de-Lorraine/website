import imageFields from './image.js';
import {intern as videoFields} from './video.js';

export default `
image {
    ${imageFields}
}
video {
    id
    ${videoFields}
}
useVideo: use_video`;

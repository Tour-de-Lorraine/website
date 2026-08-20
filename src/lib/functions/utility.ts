/*///////////////////////////////////////////////////////////////////////////

	JS TOOLS

/////////////////////////////////////////////////////////////////////////////

*****************************************************************************
	INDEX
*****************************************************************************

  Misc
    convertRichText
    tryJsonEncode
    isObject
    deepCopy
    createId

  Array
    forceArray
    last

  Strings
    stringsToWords
    changeWordCases
    camelize
    pascalize
    capitalize
    slugify

  Numbers
    notNegative
    round
    readableNumber

  Async
    timeout
    nextFrame

  Document
    isDOMElement
    getCssValue
    replaceClass
    scrollIntoViewOnClick
    getBestIntersection

  Viewport
    layoutBreakpoints
    formatThresholds
    observeViewport
    getViewportFormat
    getViewportWidth
    calcFormat

  Worker
    generalWorker

  Fetch files
    getBlob
    getBlob_worker
    getImage
    getImage_worker
    loadImage

******************************************************************************/

/* Misc
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export function convertRichText(input) {
    if (typeof input === 'string') return input;

    const runner = (input) => {
        return input.map((part) => {
            if (part.text || part.text === '') {
                let cache = [part.text];

                if (part.bold) {
                    cache = ['<strong>', ...cache, '</strong>'];
                }

                if (part.italic) {
                    cache = ['<italic>', ...cache, '</italic>'];
                }

                return cache;
            } else if (part.children) {
                let cache = [runner(part.children)];

                if (part.type) {
                    cache = [`<${part.type}>`, ...cache, `</${part.type}>`];
                }

                return cache;
            } else {
                throw `unknown richtext part: ${part}`;
            }
        });
    };

    const complete = runner(input);
    return complete.flat(99999999).join('');
}

export function tryJsonEncode(input) {
    let output;
    try {
        output = JSON.parse(input);
    } catch (error) {
        output = input;
    }
    return output;
}

export function isObject(input) {
    if (typeof input === 'object' && Array.isArray(input) === false) {
        return true;
    } else {
        return false;
    }
}

export function deepCopy(input) {
    if (typeof input === 'object') {
        // Copy Array
        if (input instanceof Array) {
            const newArray = [];
            for (let i = 0, mx = input.length; i < mx; i++) newArray[i] = deepCopy(input[i]);
            return newArray;
        }
        // Copy Object
        else if (input instanceof Object) {
            // No copies of DOM-elements:
            if (input instanceof Element) return input;
            //
            const newObject = {};
            for (const _key in input) newObject[_key] = deepCopy(input[_key]);
            return newObject;
        }
    }
    // Copy primitives and functions:
    else return input;
}

export function createId(prefix = 'i') {
    return `${prefix}-${Math.ceil(Date.now() + Math.random() * 1000000000).toString(32)}`;
}

/* Array
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export function forceArray(input) {
    if (Array.isArray(input) === false) input = [input];
    return input;
}

export function last(array) {
    if (Array.isArray(array)) return array[array.length - 1];
    throw 'Input is not an array.';
}

/* String
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export function stringsToWords(...strings) {
    const words = [];
    strings.forEach((string) => {
        string = string.split(' ');
        words.push(...string);
    });
    return words;
}

export function changeWordCases(first, ...words) {
    const changed = words.reduce((total, s, i) => {
        if (i >= first) {
            total += s.slice(0, 1).toUpperCase() + s.slice(1);
        } else total += s;
        return total;
    }, '');
    return changed;
}

export function camelize(...strings) {
    const words = stringsToWords(...strings);
    const camelized = changeWordCases(1, ...words);
    return camelized;
}

export function pascalize(...strings) {
    const words = stringsToWords(...strings);
    const pascalized = changeWordCases(0, ...words);
    return pascalized;
}

export function capitalize(string) {
    if (!string.length) return '';
    const [first, ...rest] = string;
    return first.toUpperCase() + rest.join('');
}

export function slugify(string) {
    if (typeof string !== 'string') return '';
    const chars = [...string.toLowerCase()];
    const slug = chars.reduce((slugged, c) => {
        switch (true) {
            case c === 'ä':
                return slugged + 'ae';
            case c === 'ö':
                return slugged + 'oe';
            case c === 'ü':
                return slugged + 'ue';
            case c === 'é' || c === 'è':
                return slugged + 'e';
            case c === 'à':
                return slugged + 'a';
            case c.match(/\s/) !== null || c === '_':
                return slugged + '-';
            case [...'abcdefghijklmnopqrstuvwxyz'].includes(c):
                return slugged + c;
            default:
                return slugged;
        }
    }, '');

    return slug;
}

/* Numbers
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export function notNegative(n) {
    return n < 0 ? 0 : n;
}

export function round(number, decimals = 0) {
    const factor = Math.max(Math.pow(10, decimals), 1);
    return Math.round(number * factor) / factor;
}

export function readableNumber(input) {
    const sanitized = parseFloat(input);
    const isNegative = sanitized < 0;
    const [int, dec] = [...(Math.abs(sanitized) + '').split('.')];
    let intAsArray = [...int];

    const readableInt = [];
    while (intAsArray.length) {
        readableInt.unshift(intAsArray.splice(-3).join(''));
    }

    return (isNegative ? '-' : '') + readableInt.join("'") + (dec ? `.${dec}` : '');
}

/* Async
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export async function timeout(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            requestAnimationFrame(() => resolve(null));
        }, ms);
    });
}

export async function nextFrame(cb = null) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            let result = null;
            if (typeof cb === 'function') result = cb();
            resolve(result);
        });
    });
}

/* Document
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export function isDOMElement(obj: Record<string, unknown>): boolean {
    if (obj instanceof Element) return true;
    else return false;
}

export function getCssValue(selector, property, toInteger = false) {
    const varValue = getComputedStyle(document.querySelector(selector)).getPropertyValue(property);

    // Check wether the return should be as is or force integer:
    if (toInteger) {
        // Extract the Unit:
        const justLetters = varValue.match(/[a-z,%]/gi);
        const varUnit = justLetters.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });

        // If Unit is Pixel cut the decimal places:
        if (varUnit === 'px') return parseInt(varValue);
        else return parseFloat(varValue);
    } else return varValue;
}

export function replaceClass(N, newClass, oldClass = null) {
    if (oldClass) N.classList.remove(oldClass);
    N.classList.add(newClass);
}

export function scrollIntoViewOnClick(N) {
    function onClick() {
        N.scrollIntoView({behavior: 'smooth', block: 'center'});
        setTimeout(
            () =>
                window.addEventListener(
                    'scroll',
                    () => {
                        N.addEventListener('click', onClick, {once: true});
                    },
                    {once: true}
                ),
            1000
        );
    }

    N.addEventListener('click', onClick, {once: true});
}

export function getBestIntersection(entries) {
    let bestIntersection = null;

    entries.forEach((e) => {
        if (e.intersectionRatio === 0) return;
        if (!bestIntersection) bestIntersection = e;
        else if (bestIntersection && e.intersectionRatio > bestIntersection.intersectionRatio)
            bestIntersection = e;
    });

    return bestIntersection;
}

export function getScrollBarWidth() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

/* Viewport
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export const layoutBreakpoints = {
    s: [0, 500],
    m: [501, 1100],
    l: [1101, 1400],
    xl: [1401]
};

export const formatThresholds = [
    // w_3
    1.66,
    // w_2
    1.3,
    // w_1
    1, // sqr
    // h_1
    0.66,
    // h_2
    0.44
    // h_3
];

export function observeViewport() {
    let format = getViewportFormat();
    let vw = getViewportWidth();

    window.addEventListener('resize', () => {
        format = getViewportFormat(format);
        vw = getViewportWidth(vw);
    });
}

function getViewportFormat(previousFormat = '') {
    const format = calcFormat(innerWidth, innerHeight);
    if (!previousFormat) {
        replaceClass(document.documentElement, `format-${format}`);
    } else if (previousFormat !== format) {
        replaceClass(document.documentElement, `format-${format}`, `format-${previousFormat}`);
    }
    return format;
}

function getViewportWidth(lastW = '') {
    let w;
    if (innerWidth < layoutBreakpoints.s[1]) w = 's';
    else if (innerWidth < layoutBreakpoints.m[1]) w = 'm';
    else if (innerWidth < layoutBreakpoints.l[1]) w = 'l';
    else w = 'xl';

    if (lastW === w) return w;

    const newList = [...document.documentElement.classList].filter((cls) => !cls.startsWith('vw-'));
    newList.push('vw-' + w);

    document.documentElement.setAttribute('class', newList.join(' '));

    return w;
}

export function calcFormat(width, height) {
    const thresholds = formatThresholds;
    const ratio = round(width / height, 2);
    let format = '';

    if (ratio > thresholds[0]) format = 'wide-3';
    else if (ratio > thresholds[1]) format = 'wide-2';
    else if (ratio > 1) format = 'wide-1';
    else if (ratio === 1) format = 'square';
    else if (ratio < thresholds[4]) format = 'tall-3';
    else if (ratio < thresholds[3]) format = 'tall-2';
    else format = 'tall-1';

    return format;
}

/* Worker
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export async function generalWorker(fn, args) {
    return new Promise((resolve, reject) => {
        const w = new Worker('js/worker.js');

        w.postMessage({fn, args});
        w.onmessage = (e) => {
            w.terminate();
            resolve(e.data);
        };
        w.onerror = (e) => {
            w.terminate();
            reject(e);
        };
    });
}

/* Fetch files
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´*/
export async function getBlob(src) {
    try {
        const response = await fetch(src);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error(error);
    }
}

export function getBlob_worker(src) {
    return generalWorker('getBlob', src);
}

export async function getImage(src) {
    try {
        const blob = await getBlob(src);
        let bitmap;
        if ('createImageBitmap' in window) {
            bitmap = await createImageBitmap(blob);
        } else {
            bitmap = maybeBlobToBitmap(blob);
        }
        return bitmap;
    } catch (error) {
        console.error(error);
    }
}

export async function getImage_worker(src) {
    const imageData = await generalWorker('getImage', src);
    // Worker will return a blob if browser doesn't support createImageBitmap():
    const bitmap = await maybeBlobToBitmap(imageData);
    return bitmap;
}

// Convert input in case it is a blob instead of a bitmap object.
// Can be used to fix browsers without createImageBitmap() support.
function maybeBlobToBitmap(input) {
    if (typeof ImageBitmap !== 'undefined' && input instanceof ImageBitmap) return input;
    if (input instanceof Blob) {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(input);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.src = url;
        });
    }

    throw 'invalid input';
}

export function loadImage(NImage, src) {
    return new Promise((resolve, reject) => {
        NImage.src = src;
        NImage.onload = () => resolve(null);
        NImage.onerror = (err) => reject(err);
    });
}

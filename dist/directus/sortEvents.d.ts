/** @typedef {string} Property */
/** @typedef {string} EventId */
/** @typedef {Object<Property, EventId[]>} EventSorting */
export default function sortEvents(data: any): {
    all: any;
    byDate: any;
    byCategory: any;
    byLocation: any;
    byAttribute: any;
};
export type Property = string;
export type EventId = string;
export type EventSorting = any;

import { ChromeEvent } from 'chrome-extension-core';

export type Event = {};

export type EventRes = {};

const event = new ChromeEvent<Event, EventRes>('event');

export default event;

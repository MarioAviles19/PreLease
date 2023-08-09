import { writable } from "svelte/store";

/**@type {import("svelte/store").Writable<import("firebase/analytics").Analytics>}*/
export const analyticsStore = writable();
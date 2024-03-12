import { writable } from "svelte/store";
import type { Encounter } from "$lib/types/encounter";
import { browser } from "$app/environment";

function createEncountersStore() {
    const { subscribe, set, update } = writable<Encounter[]>([]);

    if (browser) {
        const encounters = JSON.parse(localStorage.getItem("encounters") || "[]");
        set(encounters);
        subscribe((encounters) => {
            localStorage.setItem("encounters", JSON.stringify(encounters));
        });
    }

    return {
        subscribe,
        add(e: Encounter) {
            update((encounters) => [ ...encounters, e ]);
        },
        remove(e: Encounter) {
            update((encounters) => encounters.filter(encounter => encounter != e));
        },
    };
}

export const encounters = createEncountersStore();

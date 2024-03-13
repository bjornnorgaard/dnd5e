import { writable } from "svelte/store";
import type { Party } from "$lib/types/party";
import { browser } from "$app/environment";

function createPartiesStore() {
    const { subscribe, set, update } = writable<Party[]>([]);

    if (browser) {
        const parties = JSON.parse(localStorage.getItem("parties") || "[]");
        set(parties);
        subscribe((parties) => {
            localStorage.setItem("parties", JSON.stringify(parties));
        });
    }

    return {
        subscribe,
        add(p: Party) {
            update((parties) => [ ...parties, p ]);
        },
        remove(p: Party) {
            update((parties) => parties.filter(party => party != p));
        },
        update(p: Party) {
            update((parties) => parties.map(party => party == p ? p : party));
        },
    };
}

export const parties = createPartiesStore();

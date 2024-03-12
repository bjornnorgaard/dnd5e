import { writable } from "svelte/store";
import type { Monster } from "$lib/types/monster";
import { browser } from "$app/environment";

async function createMonstersStore() {
    const { subscribe, set, update } = writable<Monster[]>([]);

    if (browser) {
        const response = await fetch("/api/monsters", { method: "GET" });
        const json = await response.json();
        set(json);
    }

    return { subscribe };
}

export const monsters = await createMonstersStore();

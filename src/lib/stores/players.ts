import { writable } from "svelte/store";
import type { Player } from "$lib/types/player";
import { browser } from "$app/environment";

function createPlayersStore() {
    const { subscribe, set, update } = writable<Player[]>([]);

    if (browser) {
        const players = JSON.parse(localStorage.getItem("players") || "[]");
        set(players);
        subscribe((players) => {
            localStorage.setItem("players", JSON.stringify(players));
        });
    }

    return {
        subscribe,
        add(p: Player) {
            update((players) => [ ...players, p ]);
        },
        remove(p: Player) {
            update((players) => players.filter(player => player != p));
        },
        update(p: Player) {
            update((players) => players.map(player => player == p ? p : player));
        }
    };
}

export const players = createPlayersStore();

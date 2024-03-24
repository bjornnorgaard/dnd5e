import { writable } from "svelte/store";
import type { Creature } from "$lib/types/creature";

interface SideStatblock {
    isOpen: boolean;
    creature: Creature | null;
    creatureId: string | null;
}

const initialState: SideStatblock = {
    isOpen: false,
    creature: null,
    creatureId: null,
}

function createStatblockStore() {
    const { subscribe, set, update } = writable<SideStatblock>(initialState);

    return {
        subscribe,
        open: function (creature: Creature) {
            set({ isOpen: true, creature, creatureId: creature.id });
        },
        close: function () {
            update((state) => {
                return ({ ...state, isOpen: false });
            });
        },
    };
}

export const statblock = createStatblockStore();

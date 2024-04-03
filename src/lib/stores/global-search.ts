import { writable } from "svelte/store";

export interface GlobalSearchState {
    isOpen: boolean;
}

const initialState: GlobalSearchState = {
    isOpen: false,
};

function createGlobalSearchStore() {
    const { subscribe, update } = writable(initialState);

    return {
        subscribe,
        open: () => update(state => ({ ...state, isOpen: true })),
        close: () => update(state => ({ ...state, isOpen: false })),
    };
}

export const globalSearch = createGlobalSearchStore();

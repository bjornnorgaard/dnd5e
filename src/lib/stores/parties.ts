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
        addPlayer(partyId: string, playerId: string) {
            update((parties) => {
                const party = parties.find(p => p.id === partyId);
                if (party && !party.playerIds.includes(playerId)) {
                    party.playerIds.push(playerId);
                }
                return parties;
            });
        },
        removePlayer(partyId: string, playerId: string) {
            update((parties) => {
                const party = parties.find(p => p.id === partyId);
                if (party) {
                    party.playerIds = party.playerIds.filter(id => id !== playerId);
                }
                return parties;
            });
        },
    };
}

export const parties = createPartiesStore();

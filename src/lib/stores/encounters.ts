import { writable } from "svelte/store";
import type { Encounter } from "$lib/types/encounter";
import { browser } from "$app/environment";
import type { Monster } from "$lib/types/monster";

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
        addEncounter(e: Encounter) {
            update((encounters) => {
                return [ ...encounters, e ];
            });
        },
        removeEncounter(e: Encounter) {
            update((encounters) => {
                return encounters.filter(encounter => encounter != e);
            });
        },
        updateEncounter(e: Encounter) {
            update((encounters) => {
                return encounters.map(encounter => encounter == e ? e : encounter);
            });
        },
        addPlayer(encounter: Encounter, playerId: string) {
            if (encounter.playerIds.includes(playerId)) return;
            encounter.playerIds.push(playerId);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
        removePlayer(encounter: Encounter, playerId: string) {
            if (!encounter.playerIds.includes(playerId)) return;
            encounter.playerIds = encounter.playerIds.filter(id => id != playerId);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
        addParty(encounter: Encounter, partyId: string) {
            if (encounter.partyIds.includes(partyId)) return;
            encounter.partyIds.push(partyId);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
        removeParty(encounter: Encounter, partyId: string) {
            if (!encounter.partyIds.includes(partyId)) return;
            encounter.partyIds = encounter.partyIds.filter(id => id != partyId);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
        addMonster(encounter: Encounter, monster: Monster) {
            encounter.monsters.push(monster);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
        removeMonster(encounter: Encounter, monster: Monster) {
            const index = encounter.monsters.indexOf(monster);
            if (index == -1) return;
            encounter.monsters.splice(index, 1);
            update((encounters) => {
                return encounters.map(e => e == encounter ? encounter : e);
            });
        },
    };
}

export const encounters = createEncountersStore();

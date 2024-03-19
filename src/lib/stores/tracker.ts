import { writable } from "svelte/store";
import type { Encounter, Player } from "$lib/types/tracker";
import { newUUID } from "$lib/utils/uuid";
import type { Monster } from "$lib/types/monster";
import { browser } from "$app/environment";

export interface Tracker {
    players: Map<string, Player>;
    encounters: Map<string, Encounter>;
    activeEncounterId: string | null;
    activePlayerId: string | null;
    activeMonster: Monster | null;
}

function createTrackerStore() {
    const initialValue: Tracker = {
        players: new Map<string, Player>(),
        encounters: new Map<string, Encounter>(),
        activeEncounterId: null,
        activePlayerId: null,
        activeMonster: null,
    };

    const { subscribe, set, update } = writable<Tracker>(initialValue);

    if (browser) {
        const tracker = JSON.parse(localStorage.getItem("tracker") || JSON.stringify(initialValue));
        set(tracker);
        subscribe((tracker) => {
            localStorage.setItem("tracker", JSON.stringify(tracker));
        });
    }

    return {
        subscribe,
        addPlayer(newPlayer: Player) {
            update(state => {
                state.players.set(newPlayer.id, newPlayer);
                return state;
            })
        },
        removePlayer(playerId: string) {
            update(state => {
                state.players.delete(playerId);
                return state;
            })
        },
        setActivePlayerId(playerId: string) {
            update(state => {
                state.activePlayerId = playerId;
                return state;
            })
        },
        addEncounter(title: string) {
            update(state => {
                const newEncounter: Encounter = {
                    id: newUUID(),
                    title,
                    playerIds: [],
                    monsters: [],
                };
                state.encounters.set(newEncounter.id, newEncounter);
                return state;
            })
        },
        removeEncounter(encounterId: string) {
            update(state => {
                state.encounters.delete(encounterId);
                return state;
            })
        },
        setActiveEncounterId(encounterId: string) {
            update(state => {
                state.activeEncounterId = encounterId;
                return state;
            })
        },
        addMonsterToEncounter(encounterId: string, monster: Monster) {
            update(state => {
                state.encounters.get(encounterId)!.monsters.push(monster);
                return state;
            })
        },
        removeMonsterFromEncounter(encounterId: string, monsterIndex: number) {
            update(state => {
                state.encounters.get(encounterId)!.monsters.splice(monsterIndex, 1);
                return state;
            })
        },
        setActiveMonster(monster: Monster | null) {
            update(state => {
                state.activeMonster = monster;
                return state;
            })
        },
        addPlayerToEncounter(encounterId: string, playerId: string) {
            update(state => {
                state.encounters.get(encounterId)!.playerIds.push(playerId);
                return state;
            })
        },
        removePlayerFromEncounter(encounterId: string, playerId: string) {
            update(state => {
                const encounter: Encounter | undefined = state.encounters.get(encounterId);
                if (!encounter) {
                    console.error(`Encounter with id ${encounterId} not found`);
                    return state;
                }
                encounter.playerIds = encounter!.playerIds.filter(id => id !== playerId);
                return state;
            })
        },
    };
}

export const tracker = createTrackerStore();

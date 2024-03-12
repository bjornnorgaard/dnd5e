import type { Monster } from "$lib/types/monster";

export interface Encounter {
    id: string;
    name: string;
    partyIds: string[];
    playerIds: string[];
    monsters: Monster[];
}

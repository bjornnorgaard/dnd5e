import { type Creature, defaultCreature } from "$lib/types/creature";
import { newUUID } from "$lib/utils/uuid";
import type { Encounter } from "$lib/database/database";

export interface NewPlayerInput {
    name: string;
    hitPoints: number;
    armorClass: number;
    dexterity: number;
}

export function newPlayer(input: NewPlayerInput): Creature {
    const p = defaultCreature();

    p.id = newUUID();
    p.slug = newUUID();
    p.name = input.name;
    p.hit_points = input.hitPoints;
    p.current_hit_points = input.hitPoints;
    p.armor_class = input.armorClass;
    p.dexterity = input.dexterity;
    p.is_player = 1;

    return p;
}

export interface NewEncounterInput {
    title: string;
}

export function newEncounter(input: NewEncounterInput): Encounter {
    return {
        id: newUUID(),
        title: input.title,
        creatureIds: [],
    };
}

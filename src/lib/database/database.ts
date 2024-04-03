// db.ts
import Dexie, { type Table } from 'dexie';
import type { Creature } from "$lib/types/creature";
import { fetchCreatureBySlug } from "$lib/utils/fetch-creatures";
import { newPlayer } from "$lib/utils/type-constructors";
import { rollDice } from "$lib/utils/dice-roller";

export interface Encounter {
    id: string;
    title: string;
    creatureIds: string[];
}

export class TrackerDatabase extends Dexie {
    creatures!: Table<Creature>;
    encounters!: Table<Encounter>;

    constructor() {
        super('dndbybear');
        this.version(1).stores({
            creatures: '&id, slug, is_player',
            encounters: '&id',
        });
    }
}

export const db = new TrackerDatabase();

export async function addDefaultPlayers() {
    const players = [
        newPlayer({ name: "Blorg", hitPoints: 39, armorClass: 15, dexterity: 10 }),
        newPlayer({ name: "Runt", hitPoints: 28, armorClass: 16, dexterity: 10 }),
        newPlayer({ name: "Helias", hitPoints: 17, armorClass: 14, dexterity: 10 }),
    ]

    for (let player of players) {
        await db.creatures.add(player, player.id);
    }
}

export async function deleteCreature(creatureId: string) {
    await db.creatures.delete(creatureId);
}

export async function addPlayerToEncounter(encounterId: string, playerId: string) {
    const encounter = await db.encounters.get(encounterId);
    if (!encounter) {
        console.error("Encounter", encounterId, "not found");
        return;
    }

    const player = await db.creatures.get(playerId);
    if (!player) {
        console.error("Player", playerId, "not found");
        return;
    }

    if (encounter.creatureIds.includes(playerId)) {
        // console.log("Player", playerId, "already in encounter", encounterId);
        return;
    }

    await db.encounters.update(encounterId, {
        creatureIds: [ ...encounter.creatureIds, playerId ],
    });
}

export async function removeCreatureFromEncounter(encounterId: string, creatureId: string) {
    const encounter = await db.encounters.get(encounterId);
    if (!encounter) {
        console.error("Encounter", encounterId, "not found");
        return;
    }

    if (!encounter.creatureIds.includes(creatureId)) {
        console.log("Creature", creatureId, "not in encounter", encounterId);
        return;
    }

    const creature = await db.creatures.get(creatureId);
    if (!creature?.is_player) {
        await deleteCreature(creatureId);
    }

    await db.encounters.update(encounterId, {
        creatureIds: encounter.creatureIds.filter(id => id !== creatureId),
    });
}

export async function addCreatureToEncounter(encounterId: string, creatureSlug: string) {
    const encounter = await db.encounters.get(encounterId);
    if (!encounter) {
        console.error("Encounter", encounterId, "not found");
        return;
    }

    const creature = await fetchCreatureBySlug(creatureSlug);
    if (!creature) {
        console.error("Creature", creatureSlug, "not found");
        return;
    }

    const creatureIds = encounter.creatureIds;
    const creatures = await db.creatures
        .where("id").anyOf(creatureIds)
        .toArray();

    const sameCreatures = creatures.filter(c => c.slug === creatureSlug);
    creature.name = `${creature.name} #${sameCreatures.length + 1}`;
    creature.initiative = rollDice(1, 20) + creature.dexterity;

    await db.creatures.add(creature, creature.id);
    await db.encounters.update(encounterId, {
        creatureIds: [ ...encounter.creatureIds, creature.id ],
    });
}

export async function addAllPlayersToEncounter(encounterId: string) {
    const players = await db.creatures.where({ is_player: 1 }).toArray();
    for (let id of players.map(p => p.id)) {
        await addPlayerToEncounter(encounterId, id);
    }
}

export async function removeAllPlayersFromEncounter(encounterId: string) {
    const players = await db.creatures.where({ is_player: 1 }).toArray();
    for (let id of players.map(p => p.id)) {
        await removeCreatureFromEncounter(encounterId, id);
    }
}

export async function updateCreature(creature: Creature) {
    await db.creatures.put(creature, creature.id);
}

export async function deleteEncounter(encounterId: string) {
    const encounter = await db.encounters.get(encounterId);
    if (!encounter) {
        console.error("Encounter", encounterId, "not found");
        return;
    }

    const creatures = await db.creatures
        .where("is_player").equals(0)
        .and(c => encounter.creatureIds.includes(c.id))
        .toArray();

    for (let creatureId of creatures.map(c => c.id)) {
        await deleteCreature(creatureId);
    }

    await db.encounters.delete(encounterId);
}

// db.ts
import Dexie, { type Table } from 'dexie';
import type { Monster } from "$lib/types/monster";

export interface Player {
    id?: number;
    name: string;
    currentHp: number;
    maxHp: number;
    initiative: number;
    armorClass: number;
}

export interface Encounter {
    id?: number;
    title: string;
    playerIds: string[];
    monsters: Monster[];
}

export class TrackerDatabase extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    players!: Table<Player>;
    encounters!: Table<Encounter>;

    constructor() {
        super('tracker');
        this.version(1).stores({
            players: '++id, name, currentHp, maxHp, initiative, armorClass',
            encounters: '++id, title, playerIds, monsters',
        });
    }
}

export const db = new TrackerDatabase();

export function getPlayers() {
    return db.players.toArray();
}

export function getPlayer(id: number) {
    return db.players.get(id);
}

export function addPlayer(player: Player) {
    return db.players.add(player);
}

export function deletePlayer(id: number) {
    return db.players.delete(id);
}

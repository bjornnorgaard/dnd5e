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
    playerIds: number[];
    monsters: Monster[];
}

export class TrackerDatabase extends Dexie {
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

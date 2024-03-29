import FlexSearch from "flexsearch";
import type { Creature } from "$lib/types/creature";
import { loadCreatures } from "$lib/utils/json-loaders";

let creatures: Creature[] = [];
let index = new FlexSearch.Index({ tokenize: "full" });
let isBuilt = false;

export function creatureSearchString(c: Creature): `${string} ${string} ${string} ${string}` {
    return `${c.name} ${c.group} ${c.type} ${c.subtype} ${c.alignment} ${c.size}`;
}

export function buildCreatureIndex() {
    const start = performance.now();

    creatures = loadCreatures();
    creatures.forEach((c, i) => {
        const searchString: string = creatureSearchString(c);
        return index.add(i, searchString);
    });

    const end = performance.now();
    console.log(`Built creature index in ${end - start}ms`);
}

export function searchCreatures(query: string, limit: number): Creature[] {
    if (!isBuilt) {
        buildCreatureIndex();
        isBuilt = true;
    }

    return index.search(query, limit).map(r => creatures[r as number]);
}

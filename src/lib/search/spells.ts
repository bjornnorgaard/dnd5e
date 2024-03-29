import FlexSearch from "flexsearch";
import type { Spell } from "$lib/types/spell";
import { loadSpells } from "$lib/utils/json-loaders";

let spells: Spell[] = [];
let index = new FlexSearch.Index({ tokenize: "full" });
let isBuilt = false;

export function buildSpellIndex() {
    const start = performance.now();

    spells = loadSpells();
    spells.forEach((c, i) => {
        const searchString: string = `${c.name} ${c.school} ${c.dnd_class} ${c.material}`;
        return index.add(i, searchString);
    });

    const end = performance.now();
    console.log(`Built spell index in ${end - start}ms`);
}

export function searchSpells(query: string, limit: number): Spell[] {
    if (!isBuilt) {
        buildSpellIndex();
        isBuilt = true;
    }

    return index.search(query, limit).map(r => spells[r as number]);
}

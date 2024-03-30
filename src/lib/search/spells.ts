import FlexSearch from "flexsearch";
import type { Spell } from "$lib/types/spell";
import { indexOptions } from "$lib/search/constants";
import { routes } from "$lib/constants/routes";
import { siteIndex, spellIndex, spells } from "../../hooks.server";

export function spellSearchString(c: Spell): `${string} ${string} ${string} ${string}` {
    return `${c.name} ${c.school} ${c.dnd_class} ${c.material}`;
}

export function buildSpellIndex() {
    const start = performance.now();
    const flexIndex = new FlexSearch.Index(indexOptions);
    spells.forEach((s, i) => {
        const searchString: string = spellSearchString(s);
        siteIndex.add(routes.spells_slug(s.slug), `spell ${searchString}`);
        return flexIndex.add(i, searchString);
    });

    const end = performance.now();
    console.log(`Built spell index in ${end - start} ms`);
    return flexIndex;
}

export function searchSpells(query: string, limit: number = 5, offset: number = 0): Spell[] {
    const options: any = { limit: limit, offset: offset, suggest: true };
    if (!query.length) return spells.slice(offset, offset + limit);
    let results = spellIndex.search(query, options);
    return results.map(r => spells[r as number]);
}

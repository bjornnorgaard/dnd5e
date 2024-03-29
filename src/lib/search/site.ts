import FlexSearch from "flexsearch";
import type { Spell } from "$lib/types/spell";
import { loadCreatures, loadSpells } from "$lib/utils/json-loaders";
import { creatureSearchString } from "$lib/search/creatures";
import { spellSearchString } from "$lib/search/spells";
import { routes } from "$lib/constants/routes";

let index = new FlexSearch.Index({ tokenize: "full" });
let isBuilt = false;

export function buildSiteIndex() {
    const start = performance.now();

    const creatures = loadCreatures();
    const spells = loadSpells();

    creatures.forEach((c) => {
        index.add(routes.beasts_slug(c.slug), `beast creature monster ${creatureSearchString(c)}`);
    });

    spells.forEach((s) => {
        index.add(routes.spells_slug(s.slug), `spell magic cast ${spellSearchString(s)}`);
    });

    const end = performance.now();
    console.log(`Built site index in ${end - start}ms`);
}

export function searchSite(query: string, limit: number): string[] {
    if (!isBuilt) {
        buildSiteIndex();
        isBuilt = true;
    }

    return index.search(query, {
        limit: limit,
        suggest: true,
    }).map(r => r as string)
}

import FlexSearch from "flexsearch";
import { json } from "@sveltejs/kit";
import spells from "./spells.json";
import type { Spell } from "$lib/types/spell";

let index = new FlexSearch.Index({ tokenize: "full" });
let isBuilt = false;
let list: Spell[] = [];

function buildSpellIndex() {
    console.log("Building spell index")

    const data: any = spells;
    list = data.results;
    list.forEach((c, i) => {
        const searchString: string = `${c.name} ${c.desc} ${c.school} ${c.dnd_class} ${c.material}`;
        return index.add(i, searchString);
    });

    console.log("Spell index built")
}

function searchSpells(query: string, limit: number): any[] {
    return index.search(query, limit)
}

export const GET = ({ url }) => {
    let limit = Number(url.searchParams.get("limit"));
    if (!limit) {
        limit = 10;
    }

    if (!isBuilt) {
        buildSpellIndex();
        isBuilt = true;
    }

    const query: string = url.searchParams.get("query") ?? "";
    if (!query.length) {
        return json(list.slice(0, limit));
    }

    const results: Spell[] = searchSpells(query, limit).map(r => list[r]);
    return json(results);
}

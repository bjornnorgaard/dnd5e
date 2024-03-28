import FlexSearch from "flexsearch";
import type { Creature } from "$lib/types/creature";
import { json } from "@sveltejs/kit";
import creatures from "./creatures.json";

let index = new FlexSearch.Index({ tokenize: "full" });
let isBuilt = false;
let list: Creature[] = [];

function buildCreatureIndex() {
    console.log("Building creature index")

    const data: any = creatures;
    list = data.results;
    list.forEach((c, i) => {
        const searchString: string = `${c.name} ${c.group} ${c.type} ${c.subtype} ${c.alignment} ${c.size}`;
        return index.add(i, searchString);
    });

    console.log("Creature index built")
}

function searchCreatures(query: string, limit: number): any[] {
    return index.search(query, limit)
}

export const GET = ({ url }) => {
    let limit = Number(url.searchParams.get("take"));
    if (!limit) {
        limit = 10;
    }

    if (!isBuilt) {
        buildCreatureIndex();
        isBuilt = true;
    }

    const query: string = url.searchParams.get("query") ?? "";
    if (!query.length) {
        return json(list.slice(0, limit));
    }

    const results: Creature[] = searchCreatures(query, limit).map(r => list[r]);
    return json(results);
}

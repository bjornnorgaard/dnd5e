import type { Spell } from "$lib/types/spell";
import { json } from "@sveltejs/kit";
import { searchSpells } from "$lib/search/spells";

export const GET = ({ url }) => {
    let limit = Number(url.searchParams.get("limit"));
    if (!limit) {
        limit = 5;
    }

    let query: string = url.searchParams.get("query") ?? "";
    if (!query.length) {
        query = "a";
    }

    const results: Spell[] = searchSpells(query, limit);
    return json(results);
}

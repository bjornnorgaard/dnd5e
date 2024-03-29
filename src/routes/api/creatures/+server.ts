import type { Creature } from "$lib/types/creature";
import { json } from "@sveltejs/kit";
import { searchCreatures } from "$lib/search/creatures";

export const GET = ({ url }) => {
    let limit = Number(url.searchParams.get("limit"));
    if (!limit) {
        limit = 5;
    }

    let query: string = url.searchParams.get("query") ?? "";
    if (!query.length) {
        query = "a";
    }

    const results: Creature[] = searchCreatures(query, limit);
    return json(results);
}

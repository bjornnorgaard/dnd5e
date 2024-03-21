import { json } from "@sveltejs/kit";
import spells from "./spells.json";
import type { Spell } from "$lib/types/spell";

export const GET = ({ url }) => {
    const filter = url.searchParams.get("filter") as string;

    const data: any = spells;
    if (!data.results) {
        console.log("No spell data found");
        return json([]);
    }

    const list: Spell[] = data?.results ?? [];
    const res = list.filter(s => s.name.toLowerCase().includes(filter.toLowerCase())).slice(0, 50);

    return json(res);
}

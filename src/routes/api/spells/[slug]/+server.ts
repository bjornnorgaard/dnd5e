import { error, json } from "@sveltejs/kit";
import spells from "../spells.json";
import type { Spell } from "$lib/types/spell";

export const GET = ({ params }) => {
    const slug = params.slug as string;

    const list: Spell[] = spells?.results ?? [];
    if (!spells.results) {
        error(500, "Failed to load spells");
    }

    const res = list.find(s => s.slug === slug);
    if (!res) {
        error(404, `No spell found with slug ${slug}`);
    }

    return json(res);
}

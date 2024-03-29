import { error, json } from "@sveltejs/kit";
import { loadSpells } from "$lib/utils/json-loaders";

export const GET = ({ params }) => {
    const slug = params.slug as string;

    const spells = loadSpells();
    const spell = spells.find(s => s.slug === slug);
    if (!spell) {
        error(404, `No spell found with slug ${slug}`);
    }

    return json(spell);
}

import { error, json } from "@sveltejs/kit";
import { loadCreatures } from "$lib/utils/json-loaders";

export const GET = ({ params }) => {
    const slug = params.slug;

    const creatures = loadCreatures();
    const creature = creatures.find(m => m.slug === slug);
    if (!creature) {
        error(404, "Creature not found");
    }

    return json(creature);
}

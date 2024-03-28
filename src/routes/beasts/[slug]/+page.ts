import { error } from "@sveltejs/kit";

export const load = async ({ params, fetch }) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const res = await fetch(`/api/creatures/${params.slug}`);
    const creature = await res.json();

    if (!creature) {
        error(404, "Creature not found");
    }

    return { creature: creature };
}

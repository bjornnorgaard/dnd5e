import { error } from "@sveltejs/kit";

import { routes } from "$lib/constants/routes";

export const load = async ({ params, fetch }) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const res = await fetch(routes.api_creature_slug(params.slug));
    const creature = await res.json();

    if (!creature) {
        error(404, "Creature not found");
    }

    return { creature: creature };
}

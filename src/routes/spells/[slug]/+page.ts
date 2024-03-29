import { error } from "@sveltejs/kit";

import { routes } from "$lib/constants/routes";

export const load = async ({ params, fetch }) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const res = await fetch(routes.api_spells_slug(params.slug));
    const spell = await res.json();

    if (!spell) {
        error(404, "Spell not found");
    }

    return { spell: spell };
}

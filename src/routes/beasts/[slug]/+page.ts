import { error } from "@sveltejs/kit";

export const load = async ({params, fetch}) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const res = await fetch(`/api/spells/${params.slug}`);
    const spell = await res.json();

    if (!spell) {
        error(404, "Spell not found");
    }

    return {spell: spell};
}

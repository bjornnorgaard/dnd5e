import { error } from "@sveltejs/kit";
import type { Spell } from "$lib/types/spell";

export async function fetchSpells(url: string): Promise<Spell> {
    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }

    const slug = url.split("/").pop();
    if (!slug) {
        error(400, "Missing spell slug");
    }

    const res = await fetch(`/api/spells/${slug}`);
    if (!res.ok) {
        error(res.status, "Failed to fetch spell");
    }

    return await res.json();
}

import { error, json } from "@sveltejs/kit";
import creatures from "../creatures.json";
import type { Creature } from "$lib/types/creature";

export const GET = ({ params }) => {
    const slug = params.slug;

    const data: any = creatures;
    if (!data.results) {
        console.log("No monster data found");
        return json([]);
    }

    const list: Creature[] = data?.results ?? [];
    const res = list.find(m => m.slug === slug);
    if (!res) {
        error(404, "Creature not found");
    }

    return json(res);
}

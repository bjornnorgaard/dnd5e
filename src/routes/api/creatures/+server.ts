import { json } from "@sveltejs/kit";
import creatures from "./creatures.json";
import type { Creature } from "$lib/types/creature";

export const GET = ({ url }) => {
    const filter = url.searchParams.get("filter") as string;

    const data: any = creatures;
    if (!data.results) {
        console.log("No monster data found");
        return json([]);
    }

    const list: Creature[] = data?.results ?? [];
    const res = list.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())).slice(0, 10);

    return json(res);
}

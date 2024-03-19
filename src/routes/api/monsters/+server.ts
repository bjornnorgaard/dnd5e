import { json } from "@sveltejs/kit";
import monsters from "./monsters.json";
import type { Monster } from "$lib/types/monster";

export const GET = ({ url }) => {
    const filter = url.searchParams.get("filter") as string;

    const data: any = monsters;
    if (!data.results) {
        console.log("No monster data found");
        return json([]);
    }

    const list: Monster[] = data?.results ?? [];
    const res = list.filter(m => m.name.toLowerCase().includes(filter.toLowerCase())).slice(0, 100);

    return json(res);
}

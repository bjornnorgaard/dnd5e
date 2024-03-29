import { searchSite } from "$lib/search/site";
import { json } from "@sveltejs/kit";

export const GET = ({ url }) => {
    const query = url.searchParams.get("query") ?? "";
    const limit = Number(url.searchParams.get("limit")) || 5;
    const results = searchSite(query, limit);
    return json(results);
}

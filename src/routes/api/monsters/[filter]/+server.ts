import monsters from "../monsters.json";
import { json } from "@sveltejs/kit";

export const GET = ({ params }) => {
    const data = monsters.results;
    const res = data.filter(m => m.name.toLowerCase().includes(params.filter.toLowerCase()));
    return json(res);
}

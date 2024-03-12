import { json, type RequestHandler } from "@sveltejs/kit";
import monsters from "./monsters.json";

export const GET: RequestHandler = async () => {
    return json(monsters.results);
};

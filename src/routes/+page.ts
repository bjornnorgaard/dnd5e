import { redirect } from "@sveltejs/kit";
import { routes } from "$lib/constants/routes";

export const load = () => {
    redirect(307, routes.combat());
}

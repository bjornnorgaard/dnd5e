import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    if (!params.id) {
        console.log("No id provided");
        error(400, "No id provided");
    }

    return {
        id: params.id,
    }
}

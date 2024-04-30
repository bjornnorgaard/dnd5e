import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    if (!params.id) {
        error(404, "Not found");
    }
    return { id: params.id, }
}) satisfies PageLoad;

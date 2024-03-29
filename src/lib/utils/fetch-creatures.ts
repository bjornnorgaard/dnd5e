import type { Creature } from "$lib/types/creature";
import { newUUID } from "$lib/utils/uuid";

export async function fetchCreatureBySlug(slug: string): Promise<Creature> {
    const res = await fetch(`/api/creatures/${slug}`);
    const creature: Creature = await res.json();

    setCustomFields(creature);

    return creature;
}

export async function getCreatures(filter: string): Promise<Creature[]> {
    const res = await fetch(`/api/creatures?filter=${filter}`);
    const creatures: Creature[] = await res.json();

    creatures.forEach(c => {
        setCustomFields(c);
    });

    return creatures;
}

function setCustomFields(creature: Creature) {
    creature.id = newUUID();
    creature.current_hit_points = creature.hit_points;
    creature.is_player = 0;
    creature.initiative = 0;
}

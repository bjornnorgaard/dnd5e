import type { Creature } from "$lib/types/creature";

export function hitPointsColor(c: Creature, lower: number, upper: number): boolean {
    const current = c.current_hit_points;
    const max = c.hit_points;

    const percent = current / max;
    return percent >= lower && percent <= upper;
}

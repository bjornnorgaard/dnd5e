import { appendSign } from "$lib/utils/positiveSign";

export function mapAttributeToModifier(value: number): string {
    const modifier = Math.floor((value - 10) / 2);
    return appendSign(modifier);
}

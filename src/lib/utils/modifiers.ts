import { appendSign } from "$lib/utils/positive-sign";

export function mapAttributeToModifier(value: number): string {
    const modifier = Math.floor((value - 10) / 2);
    return appendSign(modifier);
}

export function pruneDesc(desc: string): string {
    return desc.replace(/\*\*/g, '');
}

export function isEmptyObject(object: Record<string, unknown>): boolean {
    return Object.keys(object).length === 0;
}
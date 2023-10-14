export function parseNumberOrNull(value: string | number): number | null {
  value = value === undefined ? '' : value.toString();
  if (value.trim().length === 0) {
    return null;
  } else {
    return Number(value);
  }
}

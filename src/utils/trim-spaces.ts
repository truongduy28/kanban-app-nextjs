export function trimSpacesAndNewlines(str: string): string {
  return str.replace(/^\s+|\s+$/g, "");
}

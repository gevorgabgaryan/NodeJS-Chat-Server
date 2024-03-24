export function escapeRegExp(keyword: string) {
  return keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

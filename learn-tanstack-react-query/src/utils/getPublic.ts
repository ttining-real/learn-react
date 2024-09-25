export function getPublic(filePath: string): string {
  if (/^https?:\/\//.test(filePath)) return filePath;
  return import.meta.env.BASE_URL + filePath;
}

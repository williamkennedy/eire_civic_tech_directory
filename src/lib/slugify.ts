/**
 * Convert a display name or label into a URL-safe slug.
 * Accent-insensitive so "Seán Lynch" and "Sean Lynch" resolve to the same page.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')                 // split accented chars into base + diacritic
    .replace(/[̀-ͯ]/g, '')   // strip the diacritics (é -> e)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')       // any run of non-alphanumerics -> single hyphen
    .replace(/^-+|-+$/g, '');          // trim leading/trailing hyphens
}

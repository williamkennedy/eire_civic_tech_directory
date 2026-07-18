import data from '../data/timeline.json';

/** A single update shown on the timeline. */
export interface TimelineUpdate {
  date: string;      // ISO 8601 (YYYY-MM-DD)
  impact: string;    // what changed
  creator: string;   // matches a project owner value from the MD frontmatter
  project: string;   // project slug (matches a file in src/content/projects); may be "" for site-level updates
  category: string;  // matches a project category value from the MD frontmatter; may be ""
  url: string;       // external link to the update
}

export const timeline = data as TimelineUpdate[];

/**
 * Newest-first. ISO (YYYY-MM-DD) strings sort chronologically as plain strings,
 * so a lexical compare is enough.
 */
export function sortByDateDesc(entries: TimelineUpdate[]): TimelineUpdate[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

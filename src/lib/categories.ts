import { getCollection } from 'astro:content';
import { slugify } from './slugify';
import { timeline } from './timeline';

export interface Category {
  slug: string;
  name: string;
  projectCount: number;
}

/**
 * Every category with a page: any project category or timeline category, keyed by slug
 * and sorted by name. The display name comes from the first source value seen.
 */
export async function getCategories(): Promise<Category[]> {
  const projects = await getCollection('projects');
  const categories = new Map<string, Category>();

  const add = (name: string, isProject: boolean) => {
    const slug = slugify(name);
    if (!slug) return;
    const category = categories.get(slug) ?? { slug, name, projectCount: 0 };
    if (isProject) category.projectCount++;
    categories.set(slug, category);
  };

  for (const project of projects) add(project.data.category, true);
  for (const update of timeline) add(update.category, false);

  return [...categories.values()].sort((a, b) => a.name.localeCompare(b.name));
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    owner: z.string(),
    description: z.string(),
    status: z.boolean(),
    link: z.string().url(),
    repo: z.string().url().optional(),
  }),
});

export const collections = { projects };

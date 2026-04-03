import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    duration: z.string(),
    category: z.string(),
    author: z.string(),
    publishedDate: z.string(),
  }),
});

export const collections = { tutorials };

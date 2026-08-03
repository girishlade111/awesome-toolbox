import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import resourcesData from '../data/resources.json';

export async function GET(context) {
  const siteUrl = context.site?.toString() || 'https://yourusername.github.io';
  const baseUrl = siteUrl.replace(/\/$/, '');

  const tutorials = await getCollection('tutorials');

  const items = [
    ...resourcesData.resources.map((resource) => ({
      title: resource.title,
      description: resource.description,
      link: `${baseUrl}/resource/${resource.id}/`,
      pubDate: new Date(resource.addedAt),
      categories: [resource.category, ...resource.tags],
    })),
    ...tutorials.map((tutorial) => ({
      title: tutorial.data.title,
      description: tutorial.data.description,
      link: `${baseUrl}/learn/${tutorial.id}/`,
      pubDate: new Date(tutorial.data.publishedDate),
      categories: [tutorial.data.difficulty, tutorial.data.category],
    })),
  ];

  return rss({
    title: 'DevHub - Developer Tool Community Hub',
    description: 'A community-driven collection of resources for developers',
    site: baseUrl,
    items: items,
    customData: `<language>en-us</language>`,
  });
}
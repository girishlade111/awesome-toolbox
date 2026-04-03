import rss from '@astrojs/rss';
import resourcesData from '../data/resources.json';

export async function GET(context) {
  const siteUrl = context.site?.toString() || 'https://yourusername.github.io';
  const baseUrl = siteUrl.replace(/\/$/, '');

  const items = [
    ...resourcesData.resources.map((resource) => ({
      title: resource.title,
      description: resource.description,
      link: `/resource/${resource.id}/`,
      pubDate: new Date(resource.addedAt),
      categories: [resource.category, ...resource.tags],
    })),
    ...resourcesData.tutorials.map((tutorial) => ({
      title: tutorial.title,
      description: tutorial.description,
      link: tutorial.url || '#',
      pubDate: new Date(),
      categories: [tutorial.difficulty, tutorial.category],
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
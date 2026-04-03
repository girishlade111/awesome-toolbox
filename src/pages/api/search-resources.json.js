---
// API endpoint for searchable resources data
import resourcesData from '../../data/resources.json';

export async function GET() {
  return new Response(JSON.stringify({
    resources: resourcesData.resources.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      tags: r.tags,
      author: r.author,
      addedAt: r.addedAt
    }))
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
---

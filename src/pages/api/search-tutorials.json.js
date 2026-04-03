---
// API endpoint for searchable tutorials data
import { getCollection } from 'astro:content';

export async function GET() {
  const tutorials = await getCollection('tutorials');
  
  return new Response(JSON.stringify({
    tutorials: tutorials.map(t => ({
      id: t.id,
      title: t.data.title,
      description: t.data.description,
      category: t.data.category,
      difficulty: t.data.difficulty,
      duration: t.data.duration,
      author: t.data.author
    }))
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
---
